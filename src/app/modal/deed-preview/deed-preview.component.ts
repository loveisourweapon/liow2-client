import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import { has } from 'lodash';

import { State as DeedPreviewModalState } from '../../store/deed-preview-modal';
import * as deedPreviewModal from '../../store/deed-preview-modal/deed-preview-modal.actions';
import { Counters } from '../../store/act';
import * as fromRoot from '../../store/reducer';

@Component({
  selector: 'liow-deed-preview-modal',
  templateUrl: './deed-preview.component.html',
  styleUrls: ['./deed-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedPreviewModalComponent implements OnChanges, OnInit {
  @Input() state = <DeedPreviewModalState>null;
  @ViewChild('modal') modal: ModalDirective;

  counters$: Observable<Counters>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (has(changes, 'state.currentValue')) {
      if (this.state.isOpen && !this.modal.isShown) {
        this.modal.show();
      } else if (!this.state.isOpen && this.modal.isShown) {
        this.modal.hide();
      }
    }
  }

  ngOnInit(): void {
    this.counters$ = this.store.select(fromRoot.getCountersState);
  }

  getDeedCount(counters$: Observable<Counters>, deedId: string): Observable<number|null> {
    return counters$.first()
      .map((counters: Counters) => counters[deedId])
      .map((counter: number) => typeof counter === 'number' ? counter : null);
  }

  onClose(): void {
    this.store.dispatch(new deedPreviewModal.CloseAction());
  }
}
