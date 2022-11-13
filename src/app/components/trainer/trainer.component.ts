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
  dataLoaded = false;

  constructor(
    private trainerDetailService: TrainerDetailService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private trainerImageService: TrainerImageService,
    private router: Router
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
  navigateDelete() {
    this.router.navigate([`trainers/delete/${this.trainerId}`]);
  }

  getByTrainerDetailId(trainerId: number) {
    this.trainerDetailService
      .getTrainerDetailById(trainerId)
      .subscribe((response) => {
        this.trainerDetail = response.data;
        console.log(this.trainerDetail);
        this.dataLoaded=true;
        this.getTrainerImages();
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
}
