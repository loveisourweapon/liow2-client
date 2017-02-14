import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent {
  @Input() checked: boolean;
  @Input() disabled = false;
  @Input() size = 'medium';
  @Input() color = 'rgb(100, 189, 99)';
  @Input() handleColor = '#fff';
  @Input() handleOffColor: string;
  @Output() change = new EventEmitter<boolean>();

  backgroundOffColor = '#fff';
  borderColor = '#dfdfdf';

  getHandleColor(): string {
    return this.checked
      ? this.handleColor
      : (this.handleOffColor || this.handleColor)
      ;
  }

  getBackgroundColor(): string {
    return this.checked
      ? this.color
      : this.backgroundOffColor
      ;
  }

  @HostListener('click')
  onToggle() {
    if (this.disabled) { return; }
    this.change.emit(!this.checked);
  }
}
