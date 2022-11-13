import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from './../models/singleResponseModel';
import { TrainerDetail } from './../models/trainer-detail';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Trainer } from '../models/trainer';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TrainerDetailService {

  apiUrl="https://localhost:44345/api/";

  constructor(private httpClient:HttpClient) { }

getTrainers():Observable<ListResponseModel<TrainerDetail>>{
    let newPath= this.apiUrl+"trainers/gettrainerdetails"
    return this.httpClient.get<ListResponseModel<TrainerDetail>>(newPath);
}
getTrainersByAddress(addressId:number):Observable<ListResponseModel<TrainerDetail>>{
  let newPath= this.apiUrl+"trainers/getbyaddress?addressId="+addressId
  return this.httpClient.get<ListResponseModel<TrainerDetail>>(newPath);
}

getTrainersByFormOfEdu(formOfEduId:number):Observable<ListResponseModel<TrainerDetail>>{
  let newPath= this.apiUrl+"trainers/getbyformofedu?formOfEduId="+formOfEduId
  return this.httpClient.get<ListResponseModel<TrainerDetail>>(newPath);
}
getTrainersByEducation(educationId:number):Observable<ListResponseModel<TrainerDetail>>{
  let newPath= this.apiUrl+"trainers/getbyeducation?educationId="+educationId
  return this.httpClient.get<ListResponseModel<TrainerDetail>>(newPath);
}

GetTrainerDetailsByFilter(educationId:number, formOfEduId:number, addressId:number):Observable<ListResponseModel<TrainerDetail>>{
  let newPath= this.apiUrl+"trainers/gettrainerbyfilter?educationId="+educationId+"&formOfEduId="+formOfEduId+"&addressId="+addressId;
  return this.httpClient.get<ListResponseModel<TrainerDetail>>(newPath);
}

getByTrainerId(trainerId:number):Observable<ListResponseModel<TrainerDetail>>{
  let newPath= this.apiUrl+"trainers/getbyid?trainerId="+trainerId
  return this.httpClient.get<ListResponseModel<TrainerDetail>>(newPath);
}

getTrainerDetailById(trainerId:number):Observable<SingleResponseModel<TrainerDetail>>{
  let newPath= this.apiUrl+"trainers/gettrainerdetailbyid?trainerId="+trainerId
  return this.httpClient.get<SingleResponseModel<TrainerDetail>>(newPath);
}

// add(trainer:Trainer): Observable<ResponseModel>{
//   return this.httpClient.post<ResponseModel>(this.apiUrl+"trainers/add",trainer)
// }


}