import { Component } from '@angular/core';

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

// export interface UserMsg {
//   username: string;
//   message: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'chat';
  output: string;
  userArray: User[] = [];
  clearString1 = '';
  clearString2 = '';

  userMsg = new UserMsg();
  send(user: string, msg: string) {
    this.userMsg = new UserMsg();
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
}
