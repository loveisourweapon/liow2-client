import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Deed } from '../../core/models';
import { StateService } from '../../core/services/state.service';
import { identifyBy } from '../utils';

@Component({
  selector: 'liow-deed-list-vertical',
  templateUrl: './deed-list-vertical.component.html',
  styleUrls: ['./deed-list-vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListVerticalComponent {
  @Input() deeds: Deed[];
  @Input() alwaysGlobal: boolean;

  identifyBy = identifyBy;

  constructor(
    public state: StateService,
  ) { }
}
