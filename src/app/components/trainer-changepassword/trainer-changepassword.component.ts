import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { TrainerService } from 'src/app/services/trainer.service';

import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-trainer-changepassword',
  templateUrl: './trainer-changepassword.component.html',
  styleUrls: ['./trainer-changepassword.component.css']
})
export class TrainerChangepasswordComponent implements OnInit {

  updatePasswordForm:FormGroup;

  constructor(
    private toastrService: ToastrService,
    private trainerService:TrainerService,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createupdatePasswordForm();
  }
  createupdatePasswordForm(){
    this.updatePasswordForm =this.formBuilder.group({
      trainerEmail:["",Validators.required],
      OldPassword:["",Validators.required],
      NewPassword:["",Validators.required]
    })

  }
  updatePassword(){
    console.log(this.updatePasswordForm.value)
  if (this.updatePasswordForm.valid) {
    let updatePassword = Object.assign({},this.updatePasswordForm.value)
    this.trainerService.changeTrainerPassword(updatePassword).subscribe(response=>{
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
