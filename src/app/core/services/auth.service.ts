import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  stateChanges: Observable<any>;

  constructor(
    private afa: AngularFireAuth
  ) {
    this.stateChanges = this.afa.authState;
  }

  public signInWithGoogle() {
    return this.afa.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public signOut() {
    return this.afa.signOut();
  }
}
