import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/core/models/post.model';
import { Comment } from 'src/app/core/models/comment.model';
import { firestore } from 'firebase/app';
import { AuthService } from 'src/app/core/services/auth.service';
import { SigninFormComponent } from '../../components/signin/signin.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  authState: any;
  postId: string;
  post: Post;
  templateUrl = 'https://specials-images.forbesimg.com/imageserve/5e3f2c88f133f400076bfbe2/960x0.jpg?fit=scale';

  showComments = false;
  comments: Comment[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.activatedRoute.paramMap.subscribe(u => {
      this.postId = u.get('postId');

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
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  toggleComments() {
    this.showComments = !this.showComments;
    this.postService.getComments(this.postId).subscribe(c => {
      this.comments = c;
      console.log(c);
    });
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
