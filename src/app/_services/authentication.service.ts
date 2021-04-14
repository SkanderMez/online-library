import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BASE_API, LOGIN, SIGNUP} from '../_globals/vars';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUser() {
  return this.http.get(BASE_API + 'me');
  }

  login(username: string, password: string) {
    return this.http.post<any>(BASE_API + LOGIN, {username, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  signup(username: string, password: string) {
    return this.http.post<any>(BASE_API + SIGNUP, {username, password});

  }
  updateUserInformation(user) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.currentUser = user;
    console.log(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.currentUserSubject.next(currentUser);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');

  }


  // verifToken(token: string) {
  //   return this.http.get<any>(BASE_API + FIND + '/' + token);
  // }

}
