import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private afs: AngularFirestore
  ) { }

  public async setPost(post: any): Promise<void> {
    const postId = post.id;
    delete post.uid;
    return await this.afs.collection<Post>('posts')
      .doc(postId)
      .set(post, { merge: true });
  }

  public getPosts() {
    return this.afs.collection<Post>('posts', ref => {
      return ref.orderBy('createdAt', 'desc');
    })
    .snapshotChanges()
    .pipe(
      map(a => a.map(u => ({ id: u.payload.doc.id, ...u.payload.doc.data() as Post })))
    );
  }

  public getPost(postId: string) {
    return this.afs.collection('posts')
      .doc<Post>(postId)
      .snapshotChanges()
      .pipe(
        map(u => ({ id: u.payload.id, ...u.payload.data() as Post }))
      );
  }

}
