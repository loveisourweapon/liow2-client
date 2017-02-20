import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'liow-comment-form',
  templateUrl: './comment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
  @Input() content: string;
  @Input() isSaving: boolean;
  @Output() change = new EventEmitter<string>();
  @Output() save = new EventEmitter<string>();
}
