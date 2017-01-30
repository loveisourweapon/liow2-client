import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Deed } from '../../store/models';

@Component({
  selector: 'liow-deed-list-vertical',
  templateUrl: './deed-list-vertical.component.html',
  styleUrls: ['./deed-list-vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListVerticalComponent {
  @Input() deeds: Deed[];
}
