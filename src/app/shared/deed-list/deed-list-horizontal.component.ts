import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Deed } from '../../core/models';
import { StateService } from '../../core/services/state.service';
import { identifyBy } from '../utils';

@Component({
  selector: 'liow-deed-list-horizontal',
  templateUrl: './deed-list-horizontal.component.html',
  styleUrls: ['./deed-list-horizontal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListHorizontalComponent {
  @Input() deeds: Deed[];

  identifyBy = identifyBy;

  constructor(
    public state: StateService,
  ) { }
}
