import { Component, NgModule, OnInit, isStandalone } from '@angular/core';
import { UserDataServiceService } from '../service/user-data-service.service';
import { UserDataInterface } from '../user-data-interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { routeAnimations } from '../animation';
import {NgModel, FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [routeAnimations],
})
export class UserListComponent implements OnInit {
  constructor(
    private service: UserDataServiceService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private route: Router
  ) {}

  p: number = 1;

  userListApiResult: any = [];

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

    this.userListData();
  }

  // updateUser(){
  //   this.service.putUserData(user.id, )
  // }

  selectedUserModal?:any;

  display = "none";


  updateUserFormData = new FormGroup({
   
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
    ]),
    role: new FormControl('', [Validators.required]),
  });


  updateUserSubmit(){
    console.log(this.updateUserFormData.value,this.selectedUserModal.id,'updatedUserValue#');
    this.updateUserTotalSubmit()
    this.updateUserFormData.reset();
  }

  updateUserTotalSubmit(){
    this.service.putUserData(this.selectedUserModal.id, this.updateUserFormData.value).subscribe({
      next: (result) => {
        this.toast.success('User Updated Successfully', 'Successful');
        this.closeModal()
        this.userListData();
      },
      error: (err) => {
        this.toast.error('Error User', 'Error');
      },
    })
  }
  onSelectedUser(user:any){
    this.selectedUserModal = user;
    this.display = "flex"
  }

  closeModal(){
    this.display = "none"
  }

  deleteUser(user: any) {
    this.service.deleteUserData(user.id).subscribe({
      next: (result) => {
        this.toast.success('User Deleted Successfully', 'Successful');
        this.userListData();
      },
      error: (err) => {
        this.toast.error('Error Deleting User', 'Error');
      },
    });
  }

  userListData() {
    this.service.fetchUserData().subscribe({
      next: (result) => {
        console.log(result, '#userDataResult');
        this.userListApiResult = result;
      },
      error: (err) => {
        this.toast.error('Try Again', "Couldn't Retrieve Data");
      },
    });
  }
}
