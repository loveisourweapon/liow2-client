import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'liow-control-panel-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelPaginationComponent {
  @Input() typeOfItems: string;
  @Input() numberOfItems: number;
  @Input() numberOfPages: number;
  @Input() currentPage: number;
  @Input() pageSize: number;
  @Output() numberOfPagesChanged = new EventEmitter<number>();
  @Output() currentPageChanged = new EventEmitter<number>();
}
