import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() create = false;

  constructor() { }

  ngOnInit(): void {
  }

}
