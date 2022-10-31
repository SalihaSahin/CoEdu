import { TrainerDetail } from './../models/trainer-detail';
import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value:TrainerDetail[], filterText:string): TrainerDetail[] {
  console.log("filter1");
  
    if (!Array.isArray(value)) {
      return value;
    }
    console.log("filter2");
    
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText ? value.filter((t:TrainerDetail)=>t.trainerName.toLocaleLowerCase().indexOf(filterText)!==-1):value;

    }
    }
//&& t.trainerSurname.toLocaleLowerCase().indexOf(filterText))