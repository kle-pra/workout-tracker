import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  maxDate = new Date();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    //must be 18 years old so set max possible picker date to today - 18 years:
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onRegisterSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
