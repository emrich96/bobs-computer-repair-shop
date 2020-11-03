/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/23/2020
; Modified By: Ashleigh Lyman
; Description: E2E MEAN Stack Application
;===========================================
*/


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { User } from 'src/app/shared/user.interface';
import { UserService } from 'src/app/shared/user.service.service';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ['userName','firstName','lastName','phoneNumber','address','email','functions'];

  constructor(private http: HttpClient, private dialog: MatDialog, private userService: UserService) {

    this.userService.findAllUsers().subscribe(res => {
      this.users = res.data;
      console.log(this.users);
    }, err => {
      console.log(err)
    })
  }

  ngOnInit(): void {
  }

  /*openCreateUserDialog() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe( () => this.userService.findAllUsers() );
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.userService.findAllUsers().subscribe(res => {
          this.users = res.data;
          console.log(this.users);
        }, err => {
          console.log(err)
        })
      }
    })
  }*/

  delete(userId, recordId) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete user ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.userService.deleteUser(userId).subscribe(res => {
          console.log('User delete');
          this.users = this.users.filter(u => u._id !== userId)
        })
      }
    })
  }

}
