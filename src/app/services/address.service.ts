import { Address } from './../models/address';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiUrl="https://localhost:44345/api/addresses/getall";

  constructor(private httpClient:HttpClient) { }

  getAddresses():Observable<ListResponseModel<Address>>{
    return this.httpClient.get<ListResponseModel<Address>>(this.apiUrl);
}
}
