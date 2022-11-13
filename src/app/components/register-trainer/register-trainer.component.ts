import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-trainer',
  templateUrl: './register-trainer.component.html',
  styleUrls: ['./register-trainer.component.css']
})
export class RegisterTrainerComponent implements OnInit {
  registerTrainerForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
this.createRegisterTrainerForm();
  }

  createRegisterTrainerForm() {
    this.registerTrainerForm = this.formBuilder.group({
      TrainerName: ["", Validators.required],
      TrainerSurName: ["", Validators.required],
      TrainerEmail: ["", Validators.required],
      TrainerPassword: ["", Validators.required],
    });
  }

  registerTrainer() {
    if (this.registerTrainerForm.valid) {
      console.log(this.registerTrainerForm.value);
      let registerTrainerModel = Object.assign({}, this.registerTrainerForm.value);
      this.authService.registerTrainer(registerTrainerModel).subscribe(
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
}
