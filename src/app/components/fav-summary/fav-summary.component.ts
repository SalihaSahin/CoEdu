import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { TrainerDetail } from './../../models/trainer-detail';
import { FavService } from './../../services/fav.service';
import { FavItem } from './../../models/favItem';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-fav-summary',
  templateUrl: './fav-summary.component.html',
  styleUrls: ['./fav-summary.component.css']
})
export class FavSummaryComponent implements OnInit {

  favItems:FavItem[]=[];
  constructor(private favService:FavService, private toastrService: ToastrService) { }

  ngOnInit(): void {
  this.getFav();
  }

  getFav(){
    this.favItems=this.favService.list();
    
  }

  removeFromFav(trainerDetail:TrainerDetail){
    this.favService.removeFromFav(trainerDetail);
    this.toastrService.error("Silindi ", trainerDetail.trainerName+" favorilerden kaldırıldı.")
  }
}
