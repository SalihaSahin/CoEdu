import { User } from './../../models/user';
import { Trainer } from './../../models/trainer';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  trainerId: number;
  userId: number;
  trainer: Trainer;
  user:User;

  constructor(
    public authService: AuthService,
    private router: Router,
    private trainerService: TrainerService,
    private activatedRoute: ActivatedRoute,
    private userService:UserService,
  )
  {}

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      
      this.authService.decodeToken();
      this.authService.roleToken();
      this.authService.nameidentifier();
    }
   
  }

  login() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  register() {
    localStorage.removeItem('token');
    this.router.navigate(['register']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
//Admin
  trainerAdd() {
    this.router.navigate(['trainers/add']);
  }
  
  userAdd(){
    this.router.navigate(['users/add']);
  }
  

//trainer
  trainerUpdate() {
    this.router.navigate([`trainers/update/${this.authService.identifier}`]);
  }
 
  
  trainerProfile() {
    this.router.navigate([`trainers/trainer/${this.authService.identifier}`]);
  }
  changeTrainerPassword(){
    this.router.navigate([`trainers/trainer/trainerchangepassword/${this.authService.identifier}`]);
  }
  

//User
  userProfile(){
    this.router.navigate([`users/user/${this.authService.identifier}`]);
  }
  userUpdate(){
    this.router.navigate([`users/update/${this.authService.identifier}`]);
  }
  changeUserPassword(){
    this.router.navigate([`users/user/userchangepassword/${this.authService.identifier}`]);
  }


}
