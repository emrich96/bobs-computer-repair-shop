/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/23/2020
; Modified By: Ashleigh Lyman
; Description: E2E MEAN Stack Application
;===========================================
*/


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.interface';
import { UserService } from './../../shared/user.service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }


  // This will validate input form data in each field
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  // Create new user instance for input data values
  // tslint:disable-next-line: typedef
  createUser() {
    const newUser = {} as User;
    newUser.userName = this.form.controls.userName.value,
      newUser.password = this.form.controls.password.value,
      newUser.firstName = this.form.controls.firstName.value,
      newUser.lastName = this.form.controls.lastName.value,
      newUser.phoneNumber = this.form.controls.phoneNumber.value,
      newUser.address = this.form.controls.address.value,
      newUser.email = this.form.controls.email.value,
      this.userService.createUser(newUser).subscribe(res => {
        this.router.navigate(['/users']);
      });

  }

  // Cancel navigation link
  // tslint:disable-next-line: typedef
  cancel() {
    this.router.navigate(['/users']);
  }

}
