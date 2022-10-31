import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-trainer',
  templateUrl: './login-trainer.component.html',
  styleUrls: ['./login-trainer.component.css']
})
export class LoginTrainerComponent implements OnInit {
  loginTrainerForm:FormGroup

  constructor(
    private formBuilder:FormBuilder, 
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createLoginTrainerForm();
  }


  createLoginTrainerForm(){
    this.loginTrainerForm=this.formBuilder.group({
      trainerEmail:["",Validators.required],
      trainerPassword:["", Validators.required]
    })
  }
  loginTrainer(){
    if(this.loginTrainerForm.valid){
      console.log(this.loginTrainerForm.value);
      let loginTrainerModel= Object.assign({},this.loginTrainerForm.value)

      this.authService.loginTrainer(loginTrainerModel).subscribe(response=>{
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
