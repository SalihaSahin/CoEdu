import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TrainerImageService } from './../../services/trainer-image.service';
import { Education } from 'src/app/models/education';
import { EducationService } from './../../services/education.service';
import { FormOfEduService } from './../../services/form-of-edu.service';
import { FormOfEdu } from './../../models/formOfEdu';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { TrainerService } from './../../services/trainer.service';
import { Trainer } from 'src/app/models/trainer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-add',
  templateUrl: './trainer-add.component.html',
  styleUrls: ['./trainer-add.component.css'],
})
export class TrainerAddComponent implements OnInit {
  trainerAddForm: FormGroup;
  addresses: Address[] = [];
  formOfEdus: FormOfEdu[] = [];
  educations: Education[] = [];
  selectedAddress = 0;
  selectedFormOfEdu = 0;
  selectedEducation = 0;

  constructor(
    private educationService: EducationService,
    private formOfEduService: FormOfEduService,
    private addressService: AddressService,
    private formBuilder:FormBuilder,
    private trainerService: TrainerService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createTrainerAddForm();
    this.getAddresses();
    this.getFormOfEdus();
    this.getEducations();
  }

  createTrainerAddForm() {
    this.trainerAddForm = this.formBuilder.group({
      trainerName: ['', Validators.required],
      trainerSurname: ['', Validators.required],
      trainerPhone: ['', Validators.required],
      trainerEmail: ['', Validators.email],
      trainerPassword: ['', Validators.required],
      trainerDate: ['', Validators.required],
      trainerGender: ['', Validators.required],
      trainerBranch: ['', Validators.required],
      trainerSchool: ['', Validators.required],
      trainerAbout: ['', Validators.required],
      aboutLessInfo: ['', Validators.required],
      addressId: ['', Validators.required],
      trainerWage: ['', Validators.required],
      formOfEduId: ['', Validators.required],
      educationId: ['', Validators.required],
      //file: ['', Validators.required],
    });
  }

  add() {
    if (this.trainerAddForm.valid) {
      let trainerModel = Object.assign({}, this.trainerAddForm.value);
      this.trainerService.add(trainerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([`/trainers/${response.data}/images`], { queryParams: { insert: 'true' } })
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
  getAddresses() {
    this.addressService.getAddresses().subscribe((response) => {
      this.addresses = response.data;
    });
  }
  getFormOfEdus() {
    this.formOfEduService.getFormOfEdus().subscribe((response) => {
      this.formOfEdus = response.data;
    });
  }
  getEducations() {
    this.educationService.getEducations().subscribe((response) => {
      this.educations = response.data;
    });
  }
}
