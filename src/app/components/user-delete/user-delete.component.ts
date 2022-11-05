import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  user:User;
  userId:number;
  dataLoaded=false;
  constructor(
    private userService:UserService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (this.userId =params['userId']) {
        this.getUserById(this.userId );
      }
    });
  }

  getUserById(userId:number){
    this.userService.getByUserId(userId).subscribe(response=>{
      this.user = response.data;
      this.dataLoaded = true;
    })
  }

  closeUserDeleteModal(){
    this.router.navigate(['']);
  }

  deleteUser(){
    this.userService.deleteUser(this.user.userId).subscribe(response=>{
      this.toastrService.success(this.user.userName + " " +this.user.userSurname, response.message)
      this.closeUserDeleteModal();
    },responseError=>{
      this.toastrService.error(responseError.error.message,"Silme Başarısız")
    })
  }

}
