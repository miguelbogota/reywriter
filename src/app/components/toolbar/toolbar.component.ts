import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  state: any;
  isRei = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.stateChanges.subscribe((u: firebase.User) => {
      this.state = null;
      this.isRei = false;
      if (u){
        this.state = u;
        if (u.email === 'miguel.bogota.mc.tpco@gmail.com' || u.email === 'reyupel22@gmail.com') {
          this.isRei = true;
        }
      }
    });
  }

  signOut() {
    this.authService.signOut();
  }

}
