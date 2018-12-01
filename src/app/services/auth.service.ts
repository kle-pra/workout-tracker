import { AuthData } from './../models/auth-data.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {

  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.authChange.next(true);
    this.router.navigate(['workout']);

  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.authChange.next(true);
    this.router.navigate(['workout']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['login']);

  }

  getUser() {
    return { ...this.user }
  }

  isAuth(): boolean {
    return Boolean(this.user)
  }

}
