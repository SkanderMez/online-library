import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  myUsers = [];
  error = false;
  signupForm: FormGroup;
  errorFound = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
  }
  checkPasswordValidity() {
    return (this.f.password.value === this.f.confirmPassword.value) ;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    this.errorFound = false;
    this.submitted = true;

    this.authenticationService.signup(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/sign-in']);
        },
        error => {
          this.signupForm.reset(this.f.username.value);
          this.error = error;
          this.errorFound = true;
          this.submitted = false;

        }, () => {
        });
  }
}
