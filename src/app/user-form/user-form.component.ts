import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataInterface } from '../user-data-interface';
import { UserDataServiceService } from '../service/user-data-service.service';
import { routeAnimations } from '../animation';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  animations: [routeAnimations],
})
export class UserFormComponent {
  constructor(
    private userService: UserDataServiceService,
    private toast: ToastrService,
    private route: Router
  ) {}

  newUserFormData = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
    ]),
    role: new FormControl('', [Validators.required]),
  });

  newUserSubmit() {
    console.log(this.newUserFormData.value, '#userDataValue');

    this.userService.postUserData(this.newUserFormData.value).subscribe({
      next: (result) => {
        this.toast.success('User Entered Successfully', 'Form Submitted');
        this.route.navigate(['']);
      },
      error: (err) => {
        this.toast.error('Try Again', 'Form Submission Unsuccessful');
      },
    });

    this.newUserFormData.reset();
  }
}
