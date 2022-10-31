import { Education } from './../models/education';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  apiUrl="https://localhost:44345/api/educations/getall";

  constructor(private httpClient:HttpClient) { }

  getEducations():Observable<ListResponseModel<Education>>{
    return this.httpClient.get<ListResponseModel<Education>>(this.apiUrl);
}
}
