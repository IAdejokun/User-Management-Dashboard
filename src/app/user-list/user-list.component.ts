import { Component, NgModule, OnInit, isStandalone } from '@angular/core';
import { UserDataServiceService } from '../service/user-data-service.service';
import { UserDataInterface } from '../user-data-interface';
import {MatPaginatorModule} from '@angular/material/paginator'
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'
import { Router } from '@angular/router';
import { routeAnimations } from '../animation';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations:[routeAnimations]
})

export class UserListComponent implements OnInit{
   
  constructor( private service: UserDataServiceService, private spinner: NgxSpinnerService, private toast:ToastrService, private route:Router ){}

  p:number = 1;

    userListApiResult:any = [];

    ngOnInit():void{
      this.spinner.show();
      
      
      setTimeout(() => {
        this.spinner.hide();
      }, 3000 );

      this.userListData();

    }

    
    

   userListData(){
    this.service.getUserData().subscribe({
      next: (result) =>{
        console.log(result, '#userDataResult');
      this.userListApiResult = result;
      },
      error: (err) => {
        this.toast.error('Try Again', "Couldn't Retrieve Data");
      }
    })
   } 
}
