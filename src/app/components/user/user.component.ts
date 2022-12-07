import { DatePipe } from '@angular/common';
import { PaymentDto } from './../../models/paymentDto';
import { PaymentService } from './../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailModel } from './../../models/user-detail';
import { UserService } from './../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserImageService } from './../../services/user-image.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userId: number;
  userDetail: UserDetailModel;
  dataLoaded = false;
  paymentsDetail: PaymentDto[] = [];
  constructor(
    private userImageService: UserImageService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private paymentService: PaymentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['userId'];
      this.getByUserDetailId(this.userId);
      this.getUserPayments(this.userId);
    });
  }
  navigateUpdate() {
    this.router.navigate([`users/update/${this.userId}`]);
  }

  getUserImages() {
    this.userImageService
      .getImagesByUserId(this.userId)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.userDetail.images = response.data.map(
            (image) => image.imagePath
          );
          this.dataLoaded = true;
        }
      });
  }
  getByUserDetailId(userId: number) {
    this.userService.getUserDetailById(userId).subscribe((response) => {
      this.userDetail = response.data;
      console.log(this.userDetail);

      this.getUserImages();
    });
  }

  getUserPayments(userId: number) {
    this.paymentService
      .getPaymentDetailsByUserId(userId)
      .subscribe((response) => {
        this.paymentsDetail = response.data;
        this.paymentsDetail.forEach((detail) => {
          detail.paymentDate = this.datePipe.transform(
            detail.paymentDate,
            'yyyy-MM-dd'
          );
        });
        this.dataLoaded = true;
      });
  }

  
}
