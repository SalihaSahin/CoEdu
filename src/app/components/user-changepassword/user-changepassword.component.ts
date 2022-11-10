import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-changepassword',
  templateUrl: './user-changepassword.component.html',
  styleUrls: ['./user-changepassword.component.css']
})
export class UserChangepasswordComponent implements OnInit {
  updatePasswordForm:UntypedFormGroup;

  constructor(
    private toastrService: ToastrService,
    private userService:UserService,
    private formBuilder: UntypedFormBuilder,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createupdatePasswordForm();
  }
  createupdatePasswordForm(){
    this.updatePasswordForm =this.formBuilder.group({
      email:["",Validators.required],
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required]
    })

  }
  updatePassword(){
    console.log(this.updatePasswordForm.value)
  if (this.updatePasswordForm.valid) {
    let updatePassword = Object.assign({},this.updatePasswordForm.value)
    this.userService.changePassword(updatePassword).subscribe(response=>{
      this.toastrService.success(response.message,"başarılı")
      //this.localStorage.removeToken();
      //this.router.navigate(["/login"])
    },responseError=>{
      this.toastrService.error("güncellenmedi")
    })
    
  }
  else{
    this.toastrService.warning("Form eksik","Dikkat !")
  }
  }
}
