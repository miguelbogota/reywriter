import { Component, OnInit, ElementRef } from '@angular/core';
import { Settings } from 'src/app/core/models/settings.model';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[];

  data: Settings = {
    title: 'Híbrido Humorístico',
    // tslint:disable-next-line: max-line-length
    about: 'Bienvenidos al lugar donde el humor, la esperanza y la conciencia, tratan de estar juntas, en un buen rato. Talento Venezolano.',
    photoUrl: 'https://images.unsplash.com/photo-1589730823931-07da2a7bf09c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1150&q=80',
    quote: {
      text: 'La precisión...no es casualidad',
      author: 'Enríque García'
    }
  };

  constructor(
    private eRef: ElementRef,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // Cover background
    if (this.data && this.data.coverUrl) {
      this.eRef.nativeElement.style.setProperty('--cover-url', `url('${this.data.coverUrl}')`);
    }
    // Get the post from firestore
    this.postService.getPosts()
      .subscribe(u => {
        this.posts = u;
      });
  }

}
