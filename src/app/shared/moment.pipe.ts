import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'moment' })
export class MomentPipe implements PipeTransform {
  transform(date: Date|string, format?: string): string {
    return moment(date).format(format);
  }
}
