import { AuthData } from './../models/auth-data.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router,
    private fireAuth: AngularFireAuth) {
    this.initAuthListener();
  }

  registerUser(authData: AuthData) {

    this.fireAuth
      .auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(_data => {
      }).catch(err => {
        console.log(err);
      });
  }

  login(authData: AuthData) {
    this.fireAuth
      .auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(_data => {
      }).catch(err => {
        console.log(err);
      });
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe(
      user => {
        if (user) {
          this.isAuthenticated = true;
          this.router.navigate(['workout']);
          this.authChange.next(true);
        } else {
          this.isAuthenticated = false;
          this.authChange.next(false);
          this.router.navigate(['login']);
        }
      },
      error => {

      }
    )

  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

}
