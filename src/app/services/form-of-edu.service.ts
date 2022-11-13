import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { FormOfEdu } from '../models/formOfEdu';

@Injectable({
  providedIn: 'root'
})
export class FormOfEduService {

  apiUrl="https://localhost:44345/api/formOfEdus/getall";

  constructor(private httpClient:HttpClient) { }

  getFormOfEdus():Observable<ListResponseModel<FormOfEdu>>{
    return this.httpClient.get<ListResponseModel<FormOfEdu>>(this.apiUrl);
}
}
