import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(SigninFormComponent);
  }
}

@Component({
  selector: 'app-signin-form',
  templateUrl: 'signin-form.html',
})
export class SigninFormComponent {
  constructor(public authService: AuthService, private dialogRef: MatDialogRef<SigninFormComponent>) { }
  public signIn() {
    this.authService.signInWithGoogle()
      .then(u => {
        this.close();
      });
  }
  public close() {
    this.dialogRef.close();
  }
}
