import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/core/models/comment.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SigninFormComponent } from '../signin/signin.component';
import { PostService } from 'src/app/core/services/post.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() create = false;
  @Input() postId: string;
  state: any;
  commentText = '';

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.auth.stateChanges.subscribe((u: firebase.User) => {
      this.state = null;
      if (u) { this.state = u; }
    });
  }

  comentar() {
    if (!this.state) {
      this.dialog.open(SigninFormComponent);
    }
    else {
      if (this.commentText.length > 15) {
        this.postService.setComment(this.postId, {
          name: this.state.displayName,
          img: this.state.photoURL,
          text: this.commentText,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
        .then(u => {
          this.postService.setPost({
            id: this.postId,
            commentCount: firestore.FieldValue.increment(1)
          });
          this.commentText = '';
        });
      }
      else {
        confirm('El minimo de caracteres permitidos son de 15.');
      }
    }
  }

}
