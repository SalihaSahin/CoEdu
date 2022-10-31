import { FormOfEduService } from './../../services/form-of-edu.service';
import { FormOfEdu } from './../../models/formOfEdu';
import { EducationService } from './../../services/education.service';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { Education } from 'src/app/models/education';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  addresses:Address[]=[];
  educations: Education[]=[];
  formOfEdus:FormOfEdu[]=[];
  
  currentEducation?:Education;
  currentAddress?:Address;
  currentFormOfEdu?:FormOfEdu;
  
 
 constructor(private addressService:AddressService, private educationService:EducationService, private formOfEduService:FormOfEduService) { }
//ngOninit component ilkez açıldığında çalışan metottur
  ngOnInit(): void {
  this.getAddresses();
    this.getEducations();
  this.getFormOfEdus();

  }
  getAddresses(){

    this.addressService.getAddresses().subscribe(response=>{
      this.addresses=response.data;
    
    })

  }
  getEducations(){

    this.educationService.getEducations().subscribe(response=>{
      this.educations=response.data;
    
    })

  }
  getFormOfEdus(){

    this.formOfEduService.getFormOfEdus().subscribe(response=>{
      this.formOfEdus=response.data;
    
    })

  }
  setCurrentAddress(address:Address){
    this.currentAddress=address;
    if(this.currentFormOfEdu||this.currentEducation){
      this.setDeletedCurrentFormOfEdu();
      this.setDeletedCurrentEducation();
    }
  }

  getCurrentAddressClass(address:Address){
 
    if(address==this.currentAddress){
   
      return "list-group-item active"
        }
        else{
          return "list-group-item"
        }
  }

  setCurrentFormOfEdu(formOfEdu:FormOfEdu){
    this.currentFormOfEdu=formOfEdu;
    if(this.currentAddress||this.currentEducation){
      this.setDeletedCurrentAddress();
      this.setDeletedCurrentEducation();
    }
  }

  getCurrentFormOfEduClass(formOfEdu:FormOfEdu){
   
    if(formOfEdu==this.currentFormOfEdu){
     
      return "list-group-item active"
        }
        else{
          return "list-group-item"
        }
  }

  setCurrentEducation(education:Education){
    this.currentEducation=education;
    if(this.currentAddress||this.currentFormOfEdu){
      this.setDeletedCurrentAddress();
      this.setDeletedCurrentFormOfEdu();
    }
  }
  getCurrentEducationClass(education:Education){
 
    if(education==this.currentEducation){
   
      return "list-group-item active"
        }
        else{
          return "list-group-item"
        }
  }

  setDeletedCurrentEducation() {

    this.currentEducation=undefined;
  }
  setDeletedCurrentFormOfEdu() {

    this.currentFormOfEdu=undefined;
  }
  setDeletedCurrentAddress() {

    this.currentAddress=undefined;
  }
  setDeletedCurrentCategory() {

    this.currentAddress=undefined;
    this.currentFormOfEdu=undefined;
  }


  getAllTrainersClass(){
    if(!this.currentAddress || !this.currentFormOfEdu){
      return "list-group-item active"
        }
        else{
          return "list-group-item"
        }
  }
}
