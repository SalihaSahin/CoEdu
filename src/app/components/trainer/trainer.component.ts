import { ToastrService } from 'ngx-toastr';
import { FavService } from './../../services/fav.service';
import { AddressService } from './../../services/address.service';
import { Address } from './../../models/address';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerDetailService } from './../../services/trainer-detail.service';
import { TrainerDetail } from './../../models/trainer-detail';
import { TrainerImageService } from './../../services/trainer-image.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  trainerId: number;
  trainerDetail: TrainerDetail;
  trainerDetails: TrainerDetail[] = [];
  dataLoaded = false;
  addressId: number;
  constructor(
    private trainerDetailService: TrainerDetailService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private trainerImageService: TrainerImageService,
    private router: Router,
    private addressService: AddressService,
    private favService: FavService,
    private toastrService:ToastrService,
  
  ) {}

  //ngOninit component ilkez açıldığında çalışan metottur
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.trainerId = params['trainerId'];
      this.getByTrainerDetailId(this.trainerId);
    });
  }

  navigateUpdate() {
    this.router.navigate([`trainers/update/${this.trainerId}`]);
  }
  navigateAddToCard() {
    this.router.navigate([`payment` ], { queryParams: { trainerId: this.trainerId } });
  }
  navigateDelete() {
    this.router.navigate([`trainers/delete/${this.trainerId}`]);
  }

  getByTrainerDetailId(trainerId: number) {
    this.trainerDetailService
      .getTrainerDetailById(trainerId)
      .subscribe((response) => {
        this.trainerDetail = response.data;
        console.log(this.trainerDetail);
        this.dataLoaded = true;
        this.getTrainerImages();
        this.addressService.getAddresses();
      });
  }

  getTrainerImages() {
    this.trainerImageService
      .getImagesByTrainerId(this.trainerId)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.trainerDetail.images = response.data.map(
            (image) => image.imagePath
          );
          this.dataLoaded = true;
        }
      });
  }
  addToFav(trainerDetail: TrainerDetail) {
    if(this.isAuthenticated()){
      this.favService.addToFav(trainerDetail); 
    this.toastrService.success('Favorilere Eklendi', trainerDetail.trainerName+' '+trainerDetail.trainerSurname);
      
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
