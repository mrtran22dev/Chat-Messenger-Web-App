import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  messagesCollection: AngularFirestoreCollection<any>;
  usersCollection: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) { }

  fetchOrder() {
    // tslint:disable-next-line: max-line-length
    return this.messagesCollection = this.db.collection('chatroom').doc('chatA').collection('messages', ref => ref.orderBy('created') );
  }

  // declare methods here
  fetchMessagesData() {
    // fetch observables
    this.messagesCollection = this.db.collection('chatroom').doc('chatA').collection('messages');
    return this.messagesCollection;
  }

  fetchUserData() {
    this.usersCollection = this.db.collection('users');
    return this.usersCollection;
  }

}
