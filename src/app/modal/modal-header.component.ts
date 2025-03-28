import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'liow-modal-header',
  templateUrl: './modal-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent {
  @Input() modalTitle: string;
  @Input() showCloseButton = true;
  @Output() close = new EventEmitter();
}
