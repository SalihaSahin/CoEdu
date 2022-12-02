import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { PaymentCreate } from './../models/paymentCreate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44345/api/";

  constructor( private httpClient:HttpClient) { }

  addPayment(payment:PaymentCreate): Observable<SingleResponseModel<string>>{
    return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl+"payments/add",payment)
  }
}
