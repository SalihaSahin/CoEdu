import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  userId: number;
  userUpdateForm:FormGroup ;
  user: User;
  dataLoaded: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router:Router

  ) {}

  ngOnInit(): void {
    this.createUserUdateForm();

    this.activatedRoute.params.subscribe((params) => {
      if (params['userId']) {
        this.userId=params['userId']
        this.getUserById(params['userId']);
      }
    });
  }

  createUserUdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      userId: [this.userId],
      userName: [''],
      userSurname: [''],
      userEmail: [''],
      userPasswordHash:[''],
      userPasswordSalt:[''],
      status:['']
      
    });
  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      console.log(userModel);
      this.userService.updateUser(userModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Success');
        this.router.navigate([`/users/${this.userId}/images`], { queryParams: { insert: 'false' } })
      });
    } else {
      this.toastrService.error(
        'Please fill in all fields on the form',
        'Error'
      );
    }
  }
  getUserById(id: number) {
    this.userService.getByUserId(id).subscribe((response) => {
      this.user = response.data;
      
      this.userUpdateForm.setValue({
        ...this.user,
      });
      this.dataLoaded = true;
    });
  }
}
