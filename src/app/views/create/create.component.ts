import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  postForm: FormGroup;
  errorMessage: string = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: [''],
      text: ['', Validators.required],
      tags: ['']
    });
  }

  ngOnInit(): void {
  }

  uploadPost(): void {
    if (this.postForm.valid) {
      this.isLoading = true;
      this.postService.getPost(this.setId()).subscribe(u => {
        if (!u?.title) {
          this.postService.setPost({
            id: this.setId(),
            title: this.title.value,
            imageUrl: this.imageUrl.value,
            text: this.setTextContent(),
            tags: this.tags.value,
            createdAt: firestore.FieldValue.serverTimestamp(),
            likes: [],
            likeCount: 0,
            readCount: 0,
            commentCount: 0,
          }).then(() => {
            this.isLoading = false;
            this.router.navigate([`/post/${this.setId()}`]);
            this.title.setValue('');
            this.imageUrl.setValue('');
            this.text.setValue('');
            this.tags.setValue('');
          });
        }
        else {
          this.errorMessage = 'El titulo ya fue usado, no puedes repetir este titulo.';
        }
      })
    }
    else {
      this.errorMessage = 'Valida la información ya que no esta completa!';
    }
  }

  setId(): string {
    return this.title.value.replace(/\s+/g, '-').toLowerCase();
  }

  setTextContent(): string[] {
    return this.text.value.split("\n");
  }

  // Getters
  get title(): AbstractControl { return this.postForm.get('title'); }
  get imageUrl(): AbstractControl { return this.postForm.get('imageUrl'); }
  get text(): AbstractControl { return this.postForm.get('text'); }
  get tags(): AbstractControl { return this.postForm.get('tags'); }

}
