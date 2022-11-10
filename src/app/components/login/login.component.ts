import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup, Validators, UntypedFormBuilder  } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:UntypedFormGroup
  
  constructor(private formBuilder:UntypedFormBuilder, 
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
  
    this.createLoginForm();
    
  }


  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      userEmail:["",Validators.required],
      userPassword:["", Validators.required]
    })
  }
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel= Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        localStorage.setItem("token",response.data.token)
        console.log(response)
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
      this.router.navigate([`/`])
    }
  }

  

}
