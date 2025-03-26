import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';

import { Deed } from '../../core/models';
import { StateService } from '../../core/services';

@Component({
  selector: 'liow-salvation-testimony-modal',
  templateUrl: './salvation-testimony.component.html',
  styleUrls: ['./salvation-testimony.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalvationTestimonyModalComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;

  deed$: Observable<Deed>;

  constructor(public state: StateService) {}

  ngOnInit(): void {
    this.deed$ = this.state.modal.salvationTestimony$.map((state) => {
      if (state.isOpen && !this.modal.isShown) {
        this.modal.show();
      } else if (!state.isOpen && this.modal.isShown) {
        this.modal.hide();
      }
      return state.deed;
    });
  }

  onClose(): void {
    this.state.modal.salvationTestimony$.next({ isOpen: false });
  }
}
