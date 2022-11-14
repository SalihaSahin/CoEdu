import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerImageService } from './../../services/trainer-image.service';
import { TrainerImage } from './../../models/trainer-image';
import { Trainer } from 'src/app/models/trainer';

import { TrainerService } from 'src/app/services/trainer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-delete',
  templateUrl: './trainer-delete.component.html',
  styleUrls: ['./trainer-delete.component.css'],
})
export class TrainerDeleteComponent implements OnInit {
  trainer: Trainer;
  trainerId: number;
  dataLoaded = false;
  images: TrainerImage[];
  imageId: number[];

  constructor(
    private trainerService: TrainerService,
    private trainerImageService: TrainerImageService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if ((this.trainerId = params['trainerId'])) {
        this.getTrainerById(this.trainerId);
      }
    });
  }

  getTrainerById(trainerId: number) {
    this.trainerService.getByTrainerId(trainerId).subscribe((response) => {
      this.trainer = response.data;
      this.dataLoaded = true;
      this.getTrainerImages();
    });
  }

  closeTrainerDeleteModal() {
    this.router.navigate(['']);
  }

  delete() {
    this.trainerService.delete(this.trainer.trainerId).subscribe(
      (response) => {
        this.toastrService.success(
          this.trainer.trainerName + ' ' + this.trainer.trainerSurname,
          response.message
        );
        this.closeTrainerDeleteModal();
        this.deleteImageTrainer();
      },
      (responseError) => {
        this.toastrService.error(
          responseError.error.message,
          'Silme Başarısız'
        );
      }
    );
  }

  getTrainerImages() {
    this.trainerImageService
      .getImagesByTrainerId(this.trainerId)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.trainer.images = response.data.map((image) => image.imagePath);
          this.dataLoaded = true;
        }
      });
  }

  getImageByTrainerId() {
    this.trainerImageService
      .getImagesByTrainerId(this.trainerId)
      .subscribe((response) => {
        this.images = response.data;
        this.dataLoaded = true;
      });
  }

  deleteImageTrainer() {
    this.trainerImageService
      .getImagesByTrainerId(this.trainerId)
      .subscribe((response) => {
        this.images = response.data;
        this.images?.forEach((image) => {
          this.trainerImageService
            .delete(Number(image.id))
            .subscribe((response) => {
              this.toastrService.success('Resim Silindi', 'Başarılı');
            });
        });
      });
  }
}
