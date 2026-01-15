import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Deed } from '../../core/models';
import { StateService } from '../../core/services/state.service';
import { identifyBy } from '../utils';
import { EnvironmentService } from '../../core/services/environment.service';

@Component({
  selector: 'liow-deed-list-vertical',
  templateUrl: './deed-list-vertical.component.html',
  styleUrls: ['./deed-list-vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListVerticalComponent {
  @Input() deeds: Deed[];
  @Input() isGlobal = false;

  identifyBy = identifyBy;

  constructor(public env: EnvironmentService, public state: StateService) {}
}
