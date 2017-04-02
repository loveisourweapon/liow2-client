import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { identifyBy } from '../utils';
import { Counters } from '../../store/act';
import { Deed } from '../../store/deed';

@Component({
  selector: 'liow-deed-list-horizontal',
  templateUrl: './deed-list-horizontal.component.html',
  styleUrls: ['./deed-list-horizontal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListHorizontalComponent {
  @Input() deeds: Deed[];
  @Input() counters: Counters;

  identifyBy = identifyBy;

  getDeedCount(counters: Counters, deedId: string): number|null {
    const counter = counters[deedId];
    return typeof counter === 'number' ? counter : null;
  }
}
