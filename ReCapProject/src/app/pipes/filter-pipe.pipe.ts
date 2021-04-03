import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((p:CarDetail) => 
    p.carName.toLocaleLowerCase().indexOf(filterText)!==-1 || 
    p.brandName.toLocaleLowerCase().indexOf(filterText)!==-1 || 
    p.colorName.toLocaleLowerCase().indexOf(filterText)!==-1
    ): value;
  }

}
