import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Counters, Deed } from '../../store/models';

@Component({
  selector: 'liow-deed-list-horizontal',
  templateUrl: './deed-list-horizontal.component.html',
  styleUrls: ['./deed-list-horizontal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListHorizontalComponent {
  @Input() deeds: Deed[];
  @Input() counters: Counters;

  getDeedCount(counters: Counters, deedId: string): number|null {
    const counter = counters[deedId];
    return typeof counter === 'number' ? counter : null;
  }
}
