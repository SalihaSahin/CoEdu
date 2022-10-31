import { ActivatedRoute, Router } from '@angular/router';
import { TrainerImageService } from './../../services/trainer-image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-add-image',
  templateUrl: './trainer-add-image.component.html',
  styleUrls: ['./trainer-add-image.component.css'],
})
export class TrainerAddImageComponent implements OnInit {
  trainerId: string; 
  file: any;
  insert: boolean = true;
  filePreview:any

  constructor(
    private trainerImageService: TrainerImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.trainerId = params['trainerId'];
    });
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['insert'] == 'false') {
        this.insert = false;
      }
    });
    this.getTrainerImages()
  }

  onFileChange(evt: any): void {
    this.file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file); // toBase64
    reader.onload = () => {
      this.filePreview = reader.result as string; // base64 Image src
      console.log(this.filePreview);
      
    };
  }

  getTrainerImages() {
    this.trainerImageService
    .getImagesByTrainerId(Number(this.trainerId))
    .subscribe((response) => {
      
      if (response.data.length > 0)
        this.filePreview = "data:image/jpg;base64," + response.data[0].imagePath
      });
  }

  uploadImage() {
    this.insert
      ? this.trainerImageService
          .add(this.trainerId, this.file)
          .subscribe((response) => {
            this.router.navigate([`/trainers/trainer/${this.trainerId}`]);
          })
      : this.trainerImageService
          .update(this.trainerId, this.file)
          .subscribe((response) => {
            this.router.navigate([`/trainers/trainer/${this.trainerId}`]);
          });
  }
}
