import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string;
  connected: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser') === null) {
      this.connected = false;
    } else {

      this.userName = JSON.parse(localStorage.getItem('currentUser')).username;
      this.connected = true;
    }
  }

  SignOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/sign-in']);
  }
}
