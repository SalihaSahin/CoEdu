import { UserAddComponent } from './components/user-add/user-add.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { UserUpdateComponent } from './components/user-update/user-update.component copy';
import { RegisterTrainerComponent } from './components/register-trainer/register-trainer.component';
import { TrainerUpdateComponent } from './components/trainer-update/trainer-update.component';
import { TrainerAddImageComponent } from './components/trainer-add-image/trainer-add-image.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TrainerAddComponent } from './components/trainer-add/trainer-add.component';
import { TrainerDetailComponent } from './components/trainer-detail/trainer-detail.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {path:"" , pathMatch:"full", component:TrainerDetailComponent},
   {path:"trainers" , component:TrainerDetailComponent},
   {path:"trainers/address/:addressId" , component:TrainerDetailComponent},
   {path:"trainers/formOfEdu/:formOfEduId" , component:TrainerDetailComponent},
   {path:"trainers/eductaion/:educationId" , component:TrainerDetailComponent},
   {path:"trainers/trainer/:trainerId" , component:TrainerComponent},
   {path:"trainers/add", component:TrainerAddComponent},
   {path:"trainers/add/:trainerId", component:TrainerAddComponent},
   {path:"login",component:LoginComponent}, 
   {path:"trainers/:trainerId/images", component:TrainerAddImageComponent},
   {path: "register", component: RegisterComponent },
   {path: "trainer/register", component: RegisterTrainerComponent },
   {path:"trainers/update/:trainerId",component:TrainerUpdateComponent},
   {path:"users/update/:userId",component:UserUpdateComponent  , canActivate:[LoginGuard,AdminGuard]},
   {path:"users/add", component:UserAddComponent},
   {path:"users/add/:userId", component:UserAddComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
