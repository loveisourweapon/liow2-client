import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-load-error',
  templateUrl: './load-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadErrorComponent {
  @Input() message = `Something went wrong loading this page.`;
  @Output() retry = new EventEmitter<void>();
}
