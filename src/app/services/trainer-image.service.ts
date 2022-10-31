import { TrainerImage } from './../models/trainer-image';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { TrainerDetail } from '../models/trainer-detail';

@Injectable({
  providedIn: 'root'
})
export class TrainerImageService {

  apiUrl="https://localhost:44345/api/";

  constructor(private httpClient:HttpClient) { }

  getImagesByTrainerId(trainerId:number):Observable<ListResponseModel<TrainerImage>>{
    let newPath= this.apiUrl+"trainerimages/getimagesbytrainerid?trainerId="+trainerId
    return this.httpClient.get<ListResponseModel<TrainerImage>>(newPath);
  }

  add(trainerId: string, file:any){
    let newPath = this.apiUrl + "trainerimages/add"
    let formData = new FormData();
    formData.append("file", file);
    formData.append("TrainerId", trainerId);
    formData.append("ImagePath", "wwwroot/Uploads/Images");
    return this.httpClient.post(newPath,formData)
  }

  update(trainerId: string, file:any){
    let newPath = this.apiUrl + "trainerimages/update"
    let formData = new FormData();
    formData.append("file", file);
    formData.append("TrainerId", trainerId);
    formData.append("ImagePath", "wwwroot/Uploads/Images");
    return this.httpClient.put(newPath,formData)
  }
}
