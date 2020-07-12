import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/core/models/post.model';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postId: string;
  post: Post;
  templateUrl = 'https://specials-images.forbesimg.com/imageserve/5e3f2c88f133f400076bfbe2/960x0.jpg?fit=scale';

  showComments = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {
    this.activatedRoute.paramMap.subscribe(u => {
      this.postId = u.get('postId');
    });
  }

  ngOnInit(): void {
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  likePost() {
    this.postService.setPost({
      id: this.postId,
      likeCount: firestore.FieldValue.increment(1)
    });
  }

}
