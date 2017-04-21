import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StateService } from '../core/services';

@Component({
  selector: 'liow-modals',
  templateUrl: './modals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalsComponent {
  constructor(
    public state: StateService,
  ) { }
}
