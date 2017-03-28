import { Pipe, PipeTransform } from '@angular/core';
import { last } from 'lodash';

@Pipe({ name: 'last' })
export class LastPipe implements PipeTransform {
  transform<T>(xs: T[]): T {
    return last(xs);
  }
}
