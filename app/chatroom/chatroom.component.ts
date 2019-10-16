import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
//import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})
export class ChatroomComponent implements OnInit {

  snapshot: any;                      // for snapshotChanges(), metadata
  messages: Observable<any[]>;
  orderMessagesCollection: AngularFirestoreCollection<any>;
  orderMessages: Observable<any[]>;
  docIdArray: any[] = [];
  msgArray: DocumentData[] = [];
  searchMsg: string;

  clear() {
    this.snapshot.subscribe(data => this.docIdArray = data.map(res => res.payload.doc.id));
    // debug/check
    // console.log(this.docIdArray);
    for (const id of this.docIdArray) {
      // debug/check
      // console.log('doc id: ' + id);
      this.dataService.fetchMessagesData().doc(id).delete();
    }
  }

  constructor(public dataService: DataService) { }

  ngOnInit() {
    // unsorted collection
    //this.messages = this.dataService.fetchMessagesData().valueChanges();

    // tslint:disable-next-line: max-line-length
    this.orderMessagesCollection = this.dataService.fetchOrder();               // returns query in descending order
    this.orderMessages = this.orderMessagesCollection.valueChanges();
    this.snapshot = this.dataService.fetchMessagesData().snapshotChanges();     // used for clear chat

    const query = this.dataService.fetchMessagesData().ref.orderBy('created');
    query.get().then(doc => doc.forEach(snapshot => this.msgArray.push(snapshot.data())));
    // for debug/check
    setTimeout(() => {for (const m of this.msgArray) { console.log(m.msg); }}, 2000);
  }

}
