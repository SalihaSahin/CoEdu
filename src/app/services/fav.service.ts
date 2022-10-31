import { FavItems } from './../models/favItems';
import { FavItem } from './../models/favItem';
import { TrainerDetail } from './../models/trainer-detail';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor() { }

  addToFav(trainerDetail:TrainerDetail){
    let item= FavItems.find(f=>f.trainerDetail.trainerId===trainerDetail.trainerId);
    if(item){
      item.quantity+=1;
    }else{
      let favItem= new FavItem();
      favItem.trainerDetail=trainerDetail;
      favItem.quantity = 1;
      FavItems.push(favItem)
    }
    
  }
  removeFromFav(trainerDetail:TrainerDetail){
    let item:FavItem = FavItems.find(f=>f.trainerDetail.trainerId===trainerDetail.trainerId);
    FavItems.splice(FavItems.indexOf(item),1);
  }

  list():FavItem[]{
    return FavItems;
  }

}
