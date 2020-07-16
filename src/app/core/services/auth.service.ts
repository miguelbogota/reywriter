import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Settings } from '../models/settings.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  stateChanges: Observable<any>;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.stateChanges = this.afa.authState;
  }

  public async setData(data: Settings): Promise<void> {
    return await this.afs
      .collection<Settings>('data')
      .doc('data')
      .set(data, { merge: true });
  }

  public getData() {
    return this.afs
      .collection<Settings>('data')
      .doc('data')
      .snapshotChanges()
      .pipe(
        map(u => u.payload.data() as Settings)
      );
  }

  public signInWithGoogle() {
    return this.afa.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public signOut() {
    return this.afa.signOut();
  }
}
