import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { UserImageService } from './../../services/user-image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-add-image',
  templateUrl: './user-add-image.component.html',
  styleUrls: ['./user-add-image.component.css']
})
export class UserAddImageComponent implements OnInit {
  userId: string; 
  file: any;
  insert: boolean = true;
  filePreview:any

  constructor(
    private userImageService: UserImageService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['userId'];
    });
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['insert'] == 'false') {
        this.insert = false;
      }
    });
    this.getUserImages()
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

  getUserImages() {
    this.userImageService
    .getImagesByUserId(Number(this.userId))
    .subscribe((response) => {
      
      if (response.data.length > 0)
        this.filePreview = "data:image/jpg;base64," + response.data[0].imagePath
      });
  }

  uploadImage() {
    this.insert
      ? this.userImageService
          .addUserImage(this.userId, this.file)
          .subscribe((response) => {
            //this.router.navigate([`/users/${this.userId}`]);
          })
      : this.userImageService
          .updateUserImage(this.userId, this.file)
          .subscribe((response) => {
           // this.router.navigate([`/users/${this.userId}`]);
          });
  }
}
