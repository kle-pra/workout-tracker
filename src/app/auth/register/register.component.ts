import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  maxDate;
  constructor() { }

  ngOnInit() {

    //must be 18 years old so set max possible picker date to today - 18 years:
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onRegisterSubmit(form: NgForm) {
    console.log(form.value);
  }

}
