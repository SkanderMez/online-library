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
    if (localStorage.getItem('user') === null) {
      this.connected = false;
    } else {
      this.userName = localStorage.getItem('user');
      this.connected = true;
    }
  }

  SignOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }
}
