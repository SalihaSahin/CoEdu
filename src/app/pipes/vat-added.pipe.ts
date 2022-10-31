import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded'
})
export class VatAddedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
//pipe: elinizdeki veriyi görsel olarak daha farklı 
//şekilde göstermek için