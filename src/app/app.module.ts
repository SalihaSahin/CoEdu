import { UserUpdateComponent } from './components/user-update/user-update.component copy';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { TrainerDetailComponent } from './components/trainer-detail/trainer-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FilterPipePipe } from './pipes/filter-pipe.pipe'

import {BrowserAnimationsModule}  from "@angular/platform-browser/animations"
import { ToastrModule } from 'ngx-toastr';
import { FavSummaryComponent } from './components/fav-summary/fav-summary.component';
import { TrainerAddComponent } from './components/trainer-add/trainer-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TrainerUpdateComponent } from './components/trainer-update/trainer-update.component';
import { TrainerAddImageComponent } from './components/trainer-add-image/trainer-add-image.component';
import { DatePipe } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterTrainerComponent } from './components/register-trainer/register-trainer.component';
import { LoginTrainerComponent } from './components/login-trainer/login-trainer.component';

import { UserComponent } from './components/user/user.component';
import { UserAddComponent } from './components/user-add/user-add.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CategoryComponent,
    TrainerComponent,
    TrainerDetailComponent,
    VatAddedPipe,
    FilterPipePipe,
    FavSummaryComponent,
    TrainerAddComponent,
    LoginComponent,
    RegisterComponent,
    TrainerUpdateComponent,
    TrainerAddImageComponent,
    ProfileComponent,
    RegisterTrainerComponent,
    LoginTrainerComponent,
    UserUpdateComponent,
    UserComponent,
    UserAddComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
      }
    }),
  ],
  providers: [
    DatePipe,
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
