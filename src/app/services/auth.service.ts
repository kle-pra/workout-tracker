import { UiService } from './ui.service';
import { AuthData } from './../models/auth-data.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router,
    private fireAuth: AngularFireAuth,
    private usService: UiService) {
    this.initAuthListener();
  }

  registerUser(authData: AuthData) {
    this.usService.progressLoadingEvent.next(true);
    this.fireAuth
      .auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(_data => {
        this.usService.progressLoadingEvent.next(false);
      }).catch(err => {
        this.usService.progressLoadingEvent.next(false);
        this.usService.showSnackbar(err.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.usService.progressLoadingEvent.next(true);
    this.fireAuth
      .auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(_data => {
        this.usService.progressLoadingEvent.next(false);
      }).catch(err => {
        this.usService.progressLoadingEvent.next(false);
        this.usService.showSnackbar(err.message, null, 3000);
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
      _error => {
      }
    )
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

}
