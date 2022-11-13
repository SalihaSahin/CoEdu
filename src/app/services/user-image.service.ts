import { HttpClient } from '@angular/common/http';
import { ResponseModel } from './../models/responseModel';
import { UserImage } from './../models/user-image';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {
  apiUrl="https://localhost:44345/api/";

  constructor(private httpClient:HttpClient) { }

  getImagesByUserId(userId:number):Observable<ListResponseModel<UserImage>>{
    let newPath= this.apiUrl+"userimages/getimagesbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<UserImage>>(newPath);
  }

  addUserImage(userId: string, file:any){
    let newPath = this.apiUrl + "userimages/add"
    let formData = new FormData();
    formData.append("file", file);
    formData.append("UserId", userId);
    formData.append("ImagePath", "wwwroot/Uploads/Images");
    return this.httpClient.post(newPath,formData)
  }

  updateUserImage(userId: string, file:any){
    let newPath = this.apiUrl + "userimages/update"
    let formData = new FormData();
    formData.append("file", file);
    formData.append("UserId", userId);
    formData.append("ImagePath", "wwwroot/Uploads/Images");
    return this.httpClient.put(newPath,formData)
  }
  delete(imageId: number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'userimages/delete',
      imageId
    );
  }
}
