import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

import { EducationService } from './../../services/education.service';
import { FormOfEduService } from './../../services/form-of-edu.service';
import { AddressService } from './../../services/address.service';
import { TrainerService } from './../../services/trainer.service';
import { Education } from './../../models/education';
import { FormOfEdu } from './../../models/formOfEdu';


import { Address } from './../../models/address';
import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-trainer-update',
  templateUrl: './trainer-update.component.html',
  styleUrls: ['./trainer-update.component.css']
})
export class TrainerUpdateComponent implements OnInit {

  addresses:Address[] = [];
  formOfEdus:FormOfEdu[] = [];
  educations:Education[]=[];
  trainerId:number;
  trainer:Trainer;
  trainerUpdateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private trainerService: TrainerService,
    private addressService: AddressService,
    private formOfEdusService: FormOfEduService,
    private educationService:EducationService,
    private toastrService:ToastrService,
    private activetedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createTrainerUpdateForm();
    this.activetedRoute.params.subscribe((params) => {
      if(params['trainerId'])
    {
      this.trainerId = params['trainerId'];
      this.getTrainerById(params['trainerId']);
    }
    this.getAllAddresses();
    this.getAllFormOfEdus();
    this.getAllEductaions();
    
   
  });
  }

  getAllAddresses()
  {
    this.addressService.getAddresses().subscribe(response =>{
      this.addresses = response.data;
    });
  }

  getAllFormOfEdus()
  {
    this.formOfEdusService.getFormOfEdus().subscribe(response =>{
      this.formOfEdus = response.data;
    });
  }

  getAllEductaions()
  {
    this.educationService.getEducations().subscribe(response =>{
      this.educations = response.data;
    });
  }

  createTrainerUpdateForm() {
    this.trainerUpdateForm = this.formBuilder.group({
      trainerId: [this.trainerId],
      trainerName: [''],
      trainerSurname: [''],
      trainerPhone: [''],
      trainerEmail: [''],
       trainerPasswordHash:[''],
       trainerPasswordSalt:[''],
       status:[''],
      trainerDate:[''],
      trainerGender:[''],
      trainerBranch:[''],
      trainerSchool:[''],
      trainerAbout:[''],
      aboutLessInfo:[''],
      addressId:[''],
      trainerWage:[''],
      formOfEduId:[''],
      educationId:[''],
  
    });
  }

  updateTrainer() {
    if (this.trainerUpdateForm.valid) {
      let trainerModel = Object.assign({}, this.trainerUpdateForm.value);
      console.log(trainerModel);
      
      //trainerModel.id =this.trainerId;
      this.trainerService.updateTrainer(trainerModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.router.navigate([`/trainers/${this.trainerId}/images`], { queryParams: { insert: 'false' } })
      });
    }
    else{
        this.toastrService.error("Please fill in all fields on the form","Error");
    }
  }

  getTrainerById(id:number)
  {
    this.trainerService.getByTrainerId(id).subscribe(response =>{
      this.trainer = response.data;
      console.log(this.trainer);
      
      this.trainerUpdateForm.setValue({
        ...this.trainer,
        trainerDate : this.datePipe.transform(this.trainer.trainerDate, "yyyy-MM-dd")
      })
    });
  }

}
