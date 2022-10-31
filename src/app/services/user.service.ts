import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { UserCreate } from '../models/userCreate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44345/api/";

  constructor( private httpClient:HttpClient) { }

getUsers():Observable<ListResponseModel<User>>{
    let newPath= this.apiUrl+"user/getall"
    return this.httpClient.get<ListResponseModel<User>>(newPath);
}
getByUserId(userId:number):Observable<SingleResponseModel<User>>{
  let newPath= this.apiUrl+"user/getbyid?userId="+userId
  return this.httpClient.get<SingleResponseModel<User>>(newPath);
}

addUser(user:UserCreate): Observable<SingleResponseModel<string>>{
  return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl+"user/add",user)
}

updateUser(user:User):Observable<ResponseModel> {
  let newPath = this.apiUrl + "user/update"
  return this.httpClient.put<ResponseModel>(newPath, user);
} 
}
