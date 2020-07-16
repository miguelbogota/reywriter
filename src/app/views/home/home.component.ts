import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Settings } from 'src/app/core/models/settings.model';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/core/models/post.model';
import { MatDialog } from '@angular/material/dialog';
import { SettingsFormComponent } from 'src/app/components/settings/settings.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsLoaded = false;

  authS: any;
  authWatch: Subscription;

  data: Settings;
  dataLoaded = false;

  constructor(
    private eRef: ElementRef,
    private postService: PostService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    // Get the post from firestore
    this.postService.getPosts().subscribe(u => {
      this.posts = u;
      this.postsLoaded = true;
    });
    // Get auth state
    this.authWatch = this.auth.stateChanges.subscribe(u => this.authS = u);
    // Get data
    this.auth.getData().subscribe(u => {
      this.data = u;
      this.dataLoaded = true;
      // Cover background
      if (this.data && this.data.coverUrl) {
        this.eRef.nativeElement.style.setProperty('--cover-url', `url('${this.data.coverUrl}')`);
      }
    });
  }

  ngOnDestroy() {
    this.authWatch.unsubscribe();
  }

  openSettings() {
    if (this.authS?.email === 'miguel.bogota.mc.tpco@gmail.com' || this.authS?.email === 'reyupel22@gmail.com') {
      this.dialog.open(SettingsFormComponent);
    }
  }

}
