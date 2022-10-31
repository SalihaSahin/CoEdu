import { TrainerCreate } from './../models/trainerCreate';
import { TrainerDetail } from './../models/trainer-detail';
import { SingleResponseModel } from './../models/singleResponseModel';
import { ResponseModel } from './../models/responseModel';
import { Trainer } from 'src/app/models/trainer';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';



@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  apiUrl="https://localhost:44345/api/";

  constructor(private httpClient:HttpClient) { }

getTrainers():Observable<ListResponseModel<Trainer>>{
    let newPath= this.apiUrl+"trainers/getall"
    return this.httpClient.get<ListResponseModel<Trainer>>(newPath);
}
getTrainersByAddress(addressId:number):Observable<ListResponseModel<Trainer>>{
  let newPath= this.apiUrl+"trainers/getbyaddress?addressId="+addressId
  return this.httpClient.get<ListResponseModel<Trainer>>(newPath);
}
getByTrainerId(trainerId:number):Observable<SingleResponseModel<Trainer>>{
  let newPath= this.apiUrl+"trainers/getbyid?trainerId="+trainerId
  return this.httpClient.get<SingleResponseModel<Trainer>>(newPath);
}

add(trainer:TrainerCreate): Observable<SingleResponseModel<string>>{
  return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl+"trainers/add",trainer)
}

updateTrainer(trainer:Trainer):Observable<ResponseModel> {
  let newPath = this.apiUrl + "trainers/update";
  return this.httpClient.put<ResponseModel>(newPath, trainer);
}

}
