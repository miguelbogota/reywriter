import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/core/models/post.model';
import { Comment } from 'src/app/core/models/comment.model';
import { firestore } from 'firebase/app';
import { AuthService } from 'src/app/core/services/auth.service';
import { SigninFormComponent } from '../../components/signin/signin.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentComponent } from 'src/app/components/modal/modal.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  authState: any;
  postId: string;
  post: Post;
  templateUrl = 'https://specials-images.forbesimg.com/imageserve/5e3f2c88f133f400076bfbe2/960x0.jpg?fit=scale';

  showComments = false;
  commentsShow: Comment[] = new Array();

  postChanges: Subscription;
  commentsChanges: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.activatedRoute.paramMap.subscribe(u => {
      this.postId = u.get('postId');

      this.activatedRoute.queryParams.subscribe(u => {
        this.showComments = u.showComments ? u.showComments : false;
        if (this.showComments) {
          this.commentsChanges = this.postService.getComments(this.postId).subscribe(c => {
            this.commentsShow = c;
          });
        }
      });

      this.authService.stateChanges
        .subscribe((user: firebase.User) => {
          if (user) {
            this.authState = user;
          }
          if (user && (!localStorage.getItem('visited') || !localStorage.getItem('visited').includes(this.postId))) {
            this.postService.setPost({
              id: this.postId,
              readCount: firestore.FieldValue.increment(1)
            });
          }
          if (!localStorage.getItem('visited') || !localStorage.getItem('visited')?.includes(this.postId)) {
            localStorage.setItem('visited', this.postId + ' ' + (localStorage.getItem('visited') ? localStorage.getItem('visited') : ''));
          }
        });
    });
  }

  ngOnInit(): void {
    this.postChanges = this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  ngOnDestroy() {
    if (this.postChanges) { this.postChanges.unsubscribe(); }
    if (this.commentsChanges) { this.commentsChanges.unsubscribe(); }
  }

  toggleComments() {
    if (!this.showComments) {
      this.router.navigate([`/post/${this.postId}`], { queryParams: { showComments: true }});
      this.commentsChanges = this.postService.getComments(this.postId).subscribe(c => {
        this.commentsShow = c;
      });
    }
    else {
      this.router.navigate([`/post/${this.postId}`]);
    }
  }

  likePost() {
    if (this.authState) {
      if (!this.post.likes?.includes(this.authState.uid)) {
        this.postService.setPost({
          id: this.postId,
          likes: firestore.FieldValue.arrayUnion(this.authState.uid),
          likeCount: firestore.FieldValue.increment(1)
        });
      }
      else {
        this.dialog.open(ModalContentComponent);
      }
    }
    else {
      this.dialog.open(SigninFormComponent);
    }
  }

}
