import { Component } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms'
import { UserDataInterface } from '../user-data-interface';
import { UserDataServiceService } from '../service/user-data-service.service';
import { routeAnimations } from '../animation';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  animations:[routeAnimations]
})
export class UserFormComponent {

  constructor(private userService: UserDataServiceService){

  }

  newUserFormData = new FormGroup({
    firstname : new FormControl('', [Validators.required]),
    lastname : new FormControl('', [Validators.required]),
    username : new FormControl('',[Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    role: new FormControl('', [Validators.required])
  })

  newUserSubmit(){
    console.log(this.newUserFormData.value, '#userDataValue');
    
    this.userService.postUserData(this.newUserFormData.value)

    this.newUserFormData.reset();
  }

}
