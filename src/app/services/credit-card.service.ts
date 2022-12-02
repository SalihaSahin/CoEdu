import { ResponseModel } from './../models/responseModel';
import { CreditCardUpdate } from './../models/creditCardUpdate';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { CreditCardCreate } from './../models/creditCardCreate';
import { CreditCard } from './../models/creditCard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  apiUrl = 'https://localhost:44345/api/';

  constructor(private httpClient: HttpClient) {}

  addCreditCard(
    creditCard: CreditCardCreate
  ): Observable<SingleResponseModel<number>> {
    return this.httpClient.post<SingleResponseModel<number>>(
      this.apiUrl + 'creditcards/add',
      creditCard
    );
  }

  updateCreditCard(
    creditCard: CreditCardUpdate
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'creditcards/update',
      creditCard
    );
  }

  getByCreditCardId(id: number): Observable<SingleResponseModel<CreditCard>> {
    return this.httpClient.get<SingleResponseModel<CreditCard>>(
      this.apiUrl + 'creditcards/getbycreditcardid?id=' + id
    );
  }
  getByCreditCardNumber(cardNumber: string): Observable<SingleResponseModel<CreditCard>> {
    return this.httpClient.get<SingleResponseModel<CreditCard>>(
      this.apiUrl + 'creditcards/getbycreditcardnumber?cardNumber=' + cardNumber
    );
  }
}
