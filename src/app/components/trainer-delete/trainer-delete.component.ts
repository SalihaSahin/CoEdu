import { Router, ActivatedRoute } from '@angular/router';
import { Trainer } from 'src/app/models/trainer';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from 'src/app/services/trainer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-delete',
  templateUrl: './trainer-delete.component.html',
  styleUrls: ['./trainer-delete.component.css']
})
export class TrainerDeleteComponent implements OnInit {
  trainer:Trainer;
  trainerId:number;
  dataLoaded=false;
  constructor(
    private trainerService:TrainerService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (this.trainerId =params['trainerId']) {
        this.getTrainerById(this.trainerId );
        //this.getTrainers();
      }
    });
  }

  getTrainerById(trainerId:number){
    this.trainerService.getByTrainerId(trainerId).subscribe(response=>{
      this.trainer = response.data;
      this.dataLoaded = true;
    })
  }

  closeTrainerDeleteModal(){
    this.router.navigate(['']);
  }

  delete(){
    this.trainerService.delete(this.trainer.trainerId).subscribe(response=>{
      this.toastrService.success(this.trainer.trainerName + " " +this.trainer.trainerSurname, response.message)
      this.closeTrainerDeleteModal();
    },responseError=>{
      this.toastrService.error(responseError.error.message,"Silme Başarısız")
    })
  }
}
