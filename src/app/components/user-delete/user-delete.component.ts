import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserImage } from './../../models/user-image';
import { UserImageService } from './../../services/user-image.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  user:User;
  userId:number;
  dataLoaded=false;
  images: UserImage[];
  imageId: number[];
 
  constructor(
    private userService:UserService,
    private userImageService:UserImageService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (this.userId =params['userId']) {
        this.getUserById(this.userId );
      }
    });
  }

  getUserById(userId:number){
    this.userService.getByUserId(userId).subscribe(response=>{
      this.user = response.data;
      this.dataLoaded = true;
      this.getUserImages();
    })
  }

  closeUserDeleteModal(){
    this.router.navigate(['']);
  }

  deleteUser(){
    this.userService.deleteUser(this.user.userId).subscribe(response=>{
      this.toastrService.success(this.user.userName + " " +this.user.userSurname, response.message)
      this.closeUserDeleteModal();
      this.deleteImageandUser();
    },responseError=>{
      this.toastrService.error(responseError.error.message,"Silme Başarısız")
    })
  }

  
  getUserImages() {
    this.userImageService
      .getImagesByUserId(this.userId)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.user.images = response.data.map(
            (image) => image.imagePath
          );
          this.dataLoaded = true;
        }
      });
  }

 
  getImageByuserId() {
    this.userImageService.getImagesByUserId(this.userId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }

  deleteImageandUser() {
    this.userImageService.getImagesByUserId(this.userId).subscribe((response) => {
      this.images = response.data;
      this.images?.forEach((image) => {
        this.userImageService.delete(Number(image.id)).subscribe((response) => {
          this.toastrService.success('Resim Silindi', 'Başarılı');
         
        });
      });
    });
  }
}
