import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormGroup } from '@angular/forms';
import { UntypedFormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup;
 

  constructor(
    private formBuilder:UntypedFormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
  this.createRegisterForm();
   
    
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      UserEmail: ['', Validators.required],
      UserPassword: ['', Validators.required],
      UserName: ['', Validators.required],
      UserSurName: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/']);
          this.toastrService.success(response.message, 'Registered.');
        },
        (responseError) => {
        
          this.toastrService.error(responseError.error);
        }
      );
      this.router.navigate([`/`]);
    } else {
      this.toastrService.error('Form geçersiz.');
    }
  }
////////

  
}
