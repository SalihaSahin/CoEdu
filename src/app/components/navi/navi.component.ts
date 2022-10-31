import { Trainer } from './../../models/trainer';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
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

  constructor(
    public authService: AuthService,
    private router: Router,
    private trainerService: TrainerService
  ) //private userService:UserService,

  {}

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.authService.decodeToken();
      this.authService.roleToken();
      this.trainerService.getByTrainerId(this.trainerId);
      //this.getUserById(this.userId);
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

  trainerAdd() {
    this.router.navigate(['trainers/add']);
  }
  trainerUpdate() {
    this.router.navigate([`trainers/update/${this.trainerId}`]);
  }
  getTrainerById(trainerId: number) {
    this.trainerService.getByTrainerId(trainerId).subscribe((response) => {
      this.trainer = response.data;
    });
  }

  // getUserById(userId:number){
  //   this.userService.getByUserId(userId);
  // }

  userAdd(){
    this.router.navigate(["users/add"]);
  }
}
