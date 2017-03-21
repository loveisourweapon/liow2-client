import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-icon-checked',
  templateUrl: './icon-checked.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCheckedComponent {
  @Input() isChecked: boolean;
}
