import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';


interface User {
  id: number;
  name: string;
  city: string;
  created: string;
  updated: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Output() outputToAppComponent = new EventEmitter<User>();
  usersCollection: AngularFirestoreCollection<any>;
  snapshot: any;
  userParam: string;
  //userArray: any[] = [];
  user: any;
  docId: string;
  nameUpper: string;
  cityUpper: string;
  exist: boolean;
  updateFlag = null;


  cancel() {
    this.updateFlag = 'cancel';
    this.exist = null;
  }

  update(username: string, city: string) {
    //console.log(`${username} : ${city}`);
    console.log('update() name: ' + username);
    username = username.toLowerCase();
    this.exist = false;
    const query = this.usersCollection.ref.where('name', '==', username);
    console.log('start value of exist: ' + this.exist);

    query.get().then((querySnap) => querySnap
    .forEach(doc => { console.log('query orEach() item: ' + doc.data().name);
                      if (doc.data().name === username && doc.id !== this.docId) {
                        this.exist = true;
                        this.updateFlag = 'fail';
                        console.log('name exist: ' + doc.data().name + ' : exist=' + this.exist);
                      }}));

    setTimeout(() => {
      if (this.exist === false) {
        this.updateFlag = 'success';
        console.log('name DNE, change name');
        // tslint:disable-next-line: max-line-length
        this.usersCollection.doc(this.docId).update({name: username, city: `${city}`});              // returns queried collection
        // tslint:disable-next-line: align
        this.router.navigateByUrl('/profile/' + username);
      } else {
        console.log('name exist, do not change name');
      }}, 2000
    );
  }

  constructor(public dataService: DataService, public route: ActivatedRoute, private router: Router) {
    // tslint:disable-next-line: no-string-literal
    this.userParam = this.route.snapshot.params['user'];
  }


  ngOnInit() {
    this.outputToAppComponent.emit(this.snapshot);

    // this.snapshot = this.dataService.fetchUserData().snapshotChanges();
    // this.snapshot.subscribe(data => this.userArray = data.map(res => res.payload.doc.data()));

    this.usersCollection = this.dataService.fetchUserData();
    const userQuery = this.usersCollection.ref.where('name', '==', this.userParam);              // returns queried collection

    // get() method below returns a Promise
    userQuery.get().then((querySnap) => querySnap
      .forEach(doc => { this.user = doc.data();
                        this.docId = doc.id;
                        this.nameUpper = this.user.name.toUpperCase();
                        this.cityUpper = this.user.city.toUpperCase();
                        }));
    //setTimeout(() => { this.nameUpper = this.user.name.toUpperCase();
    //                   this.cityUpper = this.user.city.toUpperCase(); }, 1000);

    // debug/check only - snapshot data
    //this.snapshot.subscribe(data => console.log(data.map(res => res.payload.doc.data())));
  }

}
