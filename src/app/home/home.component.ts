import { Component, OnInit } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   * Current user.
   */
  //user: Observable<firebase.User>;

  constructor(
    //public dbAuth: AngularFireAuth
  ) {
    //this.user = dbAuth.authState
  }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
  }

}
