import { LoginTrainer } from './../models/login-trainer';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from './../models/tokenModel';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './../models/loginModel';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { RegisterModel } from '../models/register';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RegisterTrainerModel } from '../models/register-trainer';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fullName: string;
  role:string;

  apiUrl='https://localhost:44345/api/auth/';
  

  constructor(private httpClient:HttpClient,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
     ) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }
 
  loginTrainer(loginTrainerModel:LoginTrainer){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"trainer/login",loginTrainerModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  } 
  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  }
  registerTrainer(registerTrainerModel: RegisterTrainerModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "trainer/register", registerTrainerModel)
  }

  // update(userModel:UserModel): Observable<SingleResponseModel<UserModel>> {
  //   let newPath=this.apiUrl+"/update";
  //   return this.httpClient.post<SingleResponseModel<UserModel>>(newPath,userModel)
  // }

  

  decodeToken() {
    let token = localStorage.getItem('token');
    let decodedToken = this.jwtHelperService.decodeToken(token);

    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.fullName = name.split(' ')[0] + " " + name.split(' ')[1];
  }
  roleToken(){
    let token = localStorage.getItem('token');
    let roleToken= this.jwtHelperService.decodeToken(token);
    let role= roleToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.role=role;
  }
 

}
