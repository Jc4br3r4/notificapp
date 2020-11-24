import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'humanize'
})
export class HumanizePipe implements PipeTransform {
  transform(value: Date): string {
    return moment(value).locale('es').fromNow();
  }

}
