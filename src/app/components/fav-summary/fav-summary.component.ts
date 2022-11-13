import { ToastrService } from 'ngx-toastr';
import { TrainerDetail } from './../../models/trainer-detail';
import { FavService } from './../../services/fav.service';
import { FavItem } from './../../models/favItem';
import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fav-summary',
  templateUrl: './fav-summary.component.html',
  styleUrls: ['./fav-summary.component.css']
})
export class FavSummaryComponent implements OnInit {
  faTrash = faTrash;

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
