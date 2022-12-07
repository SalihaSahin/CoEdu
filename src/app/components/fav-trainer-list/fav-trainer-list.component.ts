import { ToastrService } from 'ngx-toastr';
import { TrainerDetail } from './../../models/trainer-detail';
import { FavItem } from './../../models/favItem';

import { FavService } from './../../services/fav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fav-trainer-list',
  templateUrl: './fav-trainer-list.component.html',
  styleUrls: ['./fav-trainer-list.component.css'],
})
export class FavTrainerListComponent implements OnInit {
  favItems: FavItem[] = [];
  trainerId: number;
  trainerDetail: TrainerDetail;
  dataLoaded = false;

  constructor(
    private favService: FavService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFav();
  }

  getFav() {
    this.favItems = this.favService.list();
  }
  removeFromFav(trainerDetail: TrainerDetail) {
    this.favService.removeFromFav(trainerDetail);
    this.toastrService.error(
      'Silindi ',
      trainerDetail.trainerName + ' favorilerden kaldırıldı.'
    );
  }
}
