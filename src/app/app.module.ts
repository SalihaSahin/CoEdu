import { AppRoutingModule } from './app-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';



import { UserUpdateComponent } from './components/user-update/user-update.component copy';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { TrainerDetailComponent } from './components/trainer-detail/trainer-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';   
import { FilterPipePipe } from './pipes/filter-pipe.pipe'



import { FavSummaryComponent } from './components/fav-summary/fav-summary.component';
import { TrainerAddComponent } from './components/trainer-add/trainer-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TrainerUpdateComponent } from './components/trainer-update/trainer-update.component';
import { TrainerAddImageComponent } from './components/trainer-add-image/trainer-add-image.component';

import { RegisterTrainerComponent } from './components/register-trainer/register-trainer.component';
import { LoginTrainerComponent } from './components/login-trainer/login-trainer.component';

import { UserComponent } from './components/user/user.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserAddImageComponent } from './components/user-add-image/user-add-image.component';
import { UserChangepasswordComponent } from './components/user-changepassword/user-changepassword.component';
import { TrainerChangepasswordComponent } from './components/trainer-changepassword/trainer-changepassword.component';
import { TrainerDeleteComponent } from './components/trainer-delete/trainer-delete.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { FavTrainerListComponent } from './components/fav-trainer-list/fav-trainer-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';


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
    RegisterTrainerComponent,
    LoginTrainerComponent,
    UserUpdateComponent,
    UserComponent,
    UserAddComponent,
    UserAddImageComponent,
    UserChangepasswordComponent,
    TrainerChangepasswordComponent,
    TrainerDeleteComponent,
    UserDeleteComponent,
    FavTrainerListComponent,
    FooterComponent,
    AboutUsComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
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