import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splice',
  standalone: true
})
export class SplicePipe implements PipeTransform {

  transform(value:string):string {
    return value.slice(0, 69)
  }

}
