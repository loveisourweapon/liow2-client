import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Counters } from '../../store/act';
import { Deed } from '../../store/deed';

@Component({
  selector: 'liow-deed-list-vertical',
  templateUrl: './deed-list-vertical.component.html',
  styleUrls: ['./deed-list-vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListVerticalComponent {
  @Input() deeds: Deed[];
  @Input() currentDeed: Deed;
  @Input() counters: Counters;

  getDeedCount(counters: Counters, deedId: string): number|null {
    const counter = counters[deedId];
    return typeof counter === 'number' ? counter : null;
  }
}
