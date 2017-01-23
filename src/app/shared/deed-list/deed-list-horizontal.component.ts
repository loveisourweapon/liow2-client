import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Deed } from '../../store';

@Component({
  selector: 'liow-deed-list-horizontal',
  templateUrl: './deed-list-horizontal.component.html',
  styleUrls: ['./deed-list-horizontal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListHorizontalComponent {
  @Input() deeds: Deed[];
}
