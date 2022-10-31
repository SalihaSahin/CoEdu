import { FavService } from './../../services/fav.service';
import { TrainerImageService } from './../../services/trainer-image.service';
import { TrainerComponent } from './../trainer/trainer.component';
import { Address } from 'src/app/models/address';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrainerDetailService } from './../../services/trainer-detail.service';
import { TrainerDetail } from './../../models/trainer-detail';
import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.component.html',
  styleUrls: ['./trainer-detail.component.css'],
})
export class TrainerDetailComponent implements OnInit {
  trainerDetail: TrainerDetail;
  trainerDetails: TrainerDetail[] = [];
  trainer: Trainer[] = [];

  dataLoaded = false;
  filterText = '';

  currentTrainerDetail?: TrainerDetail;
  currentTrainer?: Trainer;

  constructor(
    private trainerDetailService: TrainerDetailService,
    private trainerImageService: TrainerImageService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private favService: FavService,
    public authService:AuthService,
    private router:Router
  ) {}
  //ngOninit component ilkez açıldığında çalışan metottur
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);

      if (params['addressId']) {
        this.getTrainerDetailsByAddress(params['addressId']);
      } else if (params['formOfEduId']) {
        this.getTrainerDetailsByFormOfEdu(params['formOfEduId']);
      } else if (params['educationId']) {
        this.getTrainerDetailsByEducation(params['educationId']);
      } else if (params['trainerId']) {
        this.getByTrainerDetailId(params['trainerId']);
      } else {
        this.getTrainerDetails();
      }
    });
  }
  getTrainerDetails() {
    this.trainerDetailService.getTrainers().subscribe((response) => {
      this.trainerDetails = response.data;
      this.getTrainerImages();
      this.dataLoaded = true;
    });
  }
  getTrainerDetailsByAddress(addressId: number) {
    this.trainerDetailService
      .getTrainersByAddress(addressId)
      .subscribe((response) => {
        this.trainerDetails = response.data;
        this.getTrainerImages();

        this.dataLoaded = true;
      });
  }

  getTrainerDetailsByFormOfEdu(formOfeduId: number) {
    this.trainerDetailService
      .getTrainersByFormOfEdu(formOfeduId)
      .subscribe((response) => {
        this.trainerDetails = response.data;
        this.getTrainerImages();
        this.dataLoaded = true;
      });
  }
  getTrainerDetailsByEducation(educationId: number) {
    this.trainerDetailService
      .getTrainersByEducation(educationId)
      .subscribe((response) => {
        this.trainerDetails = response.data;
        this.getTrainerImages();
        this.dataLoaded = true;
      });
  }

  getByTrainerDetailId(trainerId: number) {
    this.trainerDetailService
      .getByTrainerId(trainerId)
      .subscribe((response) => {
        this.trainerDetails = response.data;
        this.getTrainerImages();
        this.dataLoaded = true;
      });
  }

  setCurrentTrainer(trainerDetail: TrainerDetail) {
    this.currentTrainerDetail = trainerDetail;
  }
  //   getCurrentTrainerClass(trainerDetail:TrainerDetail){

  //     if(trainerDetail==this.currentTrainerDetail){

  //       return  this.getByTrainerDetailId(trainerDetail.trainerId);
  //   }
  // }

  getTrainerImages() {
    this.trainerDetails.forEach((trainer) => {
      this.trainerImageService
        .getImagesByTrainerId(trainer.trainerId)
        .subscribe((response) => {
          trainer.images = response.data.map((image) => image.imagePath);
        });
    });
  }

  addToFav(trainerDetail: TrainerDetail) {
    if(this.isAuthenticated()){
    this.toastrService.success('Favorilere Eklendi', trainerDetail.trainerName);
    this.favService.addToFav(trainerDetail);
  }
  else{
    this.toastrService.error('Lütfen öncelikle üye olunuz ya da giriş yapınız')
    this.router.navigate(['register'])
  }
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
