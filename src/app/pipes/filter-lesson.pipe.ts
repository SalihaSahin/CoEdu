import { Pipe, PipeTransform } from '@angular/core';
import { TrainerDetail } from '../models/trainer-detail';

@Pipe({
  name: 'filterLesson'
})
export class FilterLessonPipe implements PipeTransform {

  transform(value:TrainerDetail[], filterLesson:string): TrainerDetail[] {
    console.log("filter1");
    
      if (!Array.isArray(value)) {
        return value;
      }
      console.log("filter2");
      
      filterLesson = filterLesson?filterLesson.toLocaleLowerCase():""
      return filterLesson ? value.filter((t:TrainerDetail)=>t.trainerBranch.toLocaleLowerCase().indexOf(filterLesson)!==-1):value;
  
      }

}
