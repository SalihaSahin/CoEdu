import { Routes, RouterModule } from '@angular/router';
import { FavTrainerListComponent } from './components/fav-trainer-list/fav-trainer-list.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { TrainerDeleteComponent } from './components/trainer-delete/trainer-delete.component';
import { TrainerChangepasswordComponent } from './components/trainer-changepassword/trainer-changepassword.component';
import { UserChangepasswordComponent } from './components/user-changepassword/user-changepassword.component';
import { UserComponent } from './components/user/user.component';
import { UserAddImageComponent } from './components/user-add-image/user-add-image.component';
import { UserAddComponent } from './components/user-add/user-add.component';
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


const routes: Routes = [  
  //trainer
   {path:"" , pathMatch:"full", component:TrainerDetailComponent},
   {path:"trainers" , component:TrainerDetailComponent},
   {path:"trainers/address/:addressId" , component:TrainerDetailComponent},
   {path:"trainers/formOfEdu/:formOfEduId" , component:TrainerDetailComponent},
   {path:"trainers/eductaion/:educationId" , component:TrainerDetailComponent},
   {path:"trainers/trainer/:trainerId" , component:TrainerComponent},
   {path:"trainers/add", component:TrainerAddComponent},
   {path:"trainers/add/:trainerId", component:TrainerAddComponent},
   {path:"trainers/:trainerId/images", component:TrainerAddImageComponent},
   {path: "trainer/register", component: RegisterTrainerComponent },
   {path:"trainers/update/:trainerId",component:TrainerUpdateComponent},
   {path:"trainers/trainer/trainerchangepassword/:trainerId" , component:TrainerChangepasswordComponent},
   {path:"trainers/delete/:trainerId", component:TrainerDeleteComponent},
   {path:"favtrainerlist", component:FavTrainerListComponent},
   //user
   {path: "register", component: RegisterComponent },
   {path:"login",component:LoginComponent}, 
   {path:"users/update/:userId",component:UserUpdateComponent },
   {path:"users/add", component:UserAddComponent},
   {path:"users/add/:userId", component:UserAddComponent},
   {path:"users/:userId/images", component:UserAddImageComponent},
   {path:"users/user/:userId" , component:UserComponent},
   {path:"users/user/userchangepassword/:userId" , component:UserChangepasswordComponent},
   {path:"users/delete/:userId", component:UserDeleteComponent},

  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
