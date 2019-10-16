import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface User {
  id: number;
  name: string;
  city: string;
  created: string;
  updated: string;
}

export class UserMsg {
  username: string;
  message: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'chat';
  userArray: User[] = [];
  clearString1 = '';
  clearString2 = '';
  snapshot: any;
  username1: string;
  username2: string;

  // text = 'parentString';
  // changeText() {
  //   this.text = 'someText';
  // }

  //userMsg: UserMsg = {username: '', message: '' };      // for interface
  //userMsg = {username: '', message: ''};
  userMsg = new UserMsg();
  send(user: string, msg: string) {
    this.userMsg = new UserMsg();                         // created another UserMsg() to trigger ngOnChange()
    if (msg !== '') {
      this.userMsg.username = user;
      this.userMsg.message = msg;
      if (user === this.userArray[0].name) {
        this.clearString1 = '';
      } else {
        this.clearString2 = '';
      }
    } else {
      alert('type something');
    }
  }


  setUserProfiles(snap: any) {
    snap.subscribe(data => this.userArray = data.map(res => res.payload.doc.data()));
    // debug/check
    //setTimeout(() => console.log(this.userArray), 3000);
  }

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.snapshot = this.dataService.fetchUserData().snapshotChanges();
    this.snapshot.subscribe(data => this.userArray = data.map(res => res.payload.doc.data()));
    setTimeout(() => this.username1 = this.userArray[0].name, 1000);
    setTimeout(() => this.username2 = this.userArray[1].name, 1000);
  }

}
