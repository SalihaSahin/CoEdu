import { DatePipe } from '@angular/common';
import { TrainerService } from './../../services/trainer.service';
import { PaymentService } from './../../services/payment.service';
import { CreditCardService } from './../../services/credit-card.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  trainerId: number;
  userId: number;
  total: number;
  trainerWage: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private creditCardService: CreditCardService,
    private paymentService: PaymentService,
    private trainerService: TrainerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private datePipe: DatePipe
  ) {
    this.authService.decodeToken();
    this.userId = Number(this.authService.identifier);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.trainerId = Number(params['trainerId']);
    });
    this.createPaymentForm();

    this.trainerService.getByTrainerId(this.trainerId).subscribe((response) => {
      this.trainerWage = response.data.trainerWage;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.trainerWage * Number(this.paymentForm.value.hour);
  }

  findByCardNumber() {
    this.creditCardService
      .getByCreditCardNumber(this.paymentForm.value.cardNumber)
      .subscribe((resp) => {

        if(resp.data === null){
          this.toastrService.error(
            "Kart bilgileri bulunamadı",
            'Kredi Kart Hatası'
          );
          return;
        }

        this.paymentForm.controls['firstName'].setValue(resp.data.firstName);
        this.paymentForm.controls['lastName'].setValue(resp.data.lastName);
        this.paymentForm.controls['cardNumber'].setValue(resp.data.cardNumber);
        this.paymentForm.controls['cvv'].setValue(resp.data.cvv);
        this.paymentForm.controls['expiryDate'].setValue(
          this.datePipe.transform(resp.data.expiryDate, 'yyyy-MM-dd')
        );
      });
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      hour: [1, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expiryDate: ['', Validators.required],
    });
  }

  save() {
    if (this.paymentForm.valid) {
      let creditCardForUpsert = Object.assign(
        { userId: this.userId },
        this.paymentForm.value
      );

      //credit card var mı diye kontrol edilir:
      this.creditCardService
        .getByCreditCardNumber(this.paymentForm.value.cardNumber)
        .subscribe((getCreditCardResponse) => {
          //credit card varsa update edilir:
          if (getCreditCardResponse.data) {
            this.creditCardService
              .updateCreditCard(creditCardForUpsert)
              .subscribe((creditCardResponse) => {
                let paymentForCreate = Object.assign(
                  {
                    creditCardId: getCreditCardResponse.data.id,
                    trainerId: this.trainerId,
                  },
                  this.paymentForm.value
                );

                this.paymentService
                  .addPayment(paymentForCreate)
                  .subscribe((paymentResponse) => {
                    this.toastrService.success(
                      paymentResponse.message,
                      'Başarılı'
                    );
                  });
                //this.router.navigate([`/users/${response.data}/images`], { queryParams: { insert: 'true' } });
              });
          }

          //credit card yoksa insert edilir
          else {
            this.creditCardService.addCreditCard(creditCardForUpsert).subscribe(
              (creditCardResponse) => {
                let paymentForCreate = Object.assign(
                  {
                    creditCardId: creditCardResponse.data,
                    trainerId: this.trainerId,
                  },
                  this.paymentForm.value
                );
                this.paymentService
                  .addPayment(paymentForCreate)
                  .subscribe((paymentResponse) => {
                    this.toastrService.success(
                      paymentResponse.message,
                      'Başarılı'
                    );
                  });
                //this.router.navigate([`/users/${response.data}/images`], { queryParams: { insert: 'true' } });
              },
              (responseError) => {
                if (responseError.error.Errors.length > 0) {
                  for (let i = 0; i < responseError.error.Errors.length; i++) {
                    this.toastrService.error(
                      responseError.error.Errors[i].ErrorMessage,
                      'Kredi Kart Hatası'
                    );
                  }
                }
              }
            );
          }
        });
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
