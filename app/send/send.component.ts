import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DataService } from '../data.service';
import { firestore } from 'firebase';

interface User {
  username: string;
  message: string;
}

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit, OnChanges {

  // @Input() text;                                 // primitive type
  @Input() userMsg;                                 // custom object

  ngOnChanges(changes: SimpleChanges) {
    // check/degug: show properties
    // console.log(changes);

    const timestamp = firestore.FieldValue.serverTimestamp();
    this.dataService.fetchMessagesData().add({name: this.userMsg.username, msg: this.userMsg.message, created: timestamp});

    // // tslint:disable-next-line: forin
    // for (const propName in changes) {                            // propName = variable names of @Input decorator
    //   // tslint:disable-next-line: max-line-length
    //   const change = changes[propName];                          // when used with For-in loop, value/propertyName of arg inside [] is called.  similar to calling index of an array
    //   const currentVal = JSON.stringify(change.currentValue);
    //   const previousVal = JSON.stringify(change.previousValue);
    //   console.log(`${currentVal} : ${previousVal}`);
    // }
  }

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

}
