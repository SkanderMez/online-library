import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {equal} from 'assert';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  myUsers = [];
  error = false;
  errorMatch = false;
  emailExists = false;
  signupForm: FormGroup;


  constructor(private http: HttpClient,
              private router: Router) { }




  ngOnInit() {

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null)
    });
    console.log(this.signupForm);
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get('assets/users.json').subscribe(
      (data) => {
        console.log(data);
        let i;
        for (i = 0; i < data.users.length; i++) {
          this.myUsers.push(data.users[i]);
        }},
      (error) => {
        console.log(error);
      });
  }

  onSubmit() {
    let i;
    for (i = 0; i < this.myUsers.length; i++) {
      console.log(this.myUsers[i]);
      if (this.myUsers[i].email === this.signupForm.controls.email.value && this.myUsers[i].password === this.signupForm.controls.password.value) {
          localStorage.setItem('user', this.myUsers[i].name);
          this.router.navigate(['/']);
          break;
      } else {
          this.error = true;
      }
    }
  }

  onSubmitRegister(f: NgForm) {
    let i;
    for (i = 0; i < this.myUsers.length; i++) {
      if (f.value.emailRegister === this.myUsers[i].email){
        this.emailExists = true;
      }
    }
    if (!(f.value.password1 === f.value.password2)){
      this.errorMatch = true;
    }

    const parameter = JSON.stringify({type: 'users', name: f.value.name, email: f.value.email, password: f.value.password1});

    this.http.post('assets/users.json', parameter).subscribe(
      (data) => {
        console.log(data);
        //this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
