import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  token: any;
  roles: any[]=[];

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastrService:ToastrService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.token= localStorage.getItem("token");
      let decodedToken= this.jwtHelper.decodeToken(this.token);
      this.roles= decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if(this.roles!== undefined){
        if(this.roles.includes('admin')){
          return true;
        }else{
          this.router.navigate(["/"]);
          this.toastrService.error("BU işlem için yetkiniz bulunmuyor.");
          return false;
        }
      }else if(!this.token){
        this.router.navigate(["/"]);
        this.toastrService.error("Önce Admin olarak giriş yapmalısınız");
        return false;
      }
      this.toastrService.error("Admin olarak giriş yapmalisiniz");
      return false;

  
  }
  
}
