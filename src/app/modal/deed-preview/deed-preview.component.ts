import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Deed, ModalState } from '../../core/models';
import { ActService, DeedService, StateService } from '../../core/services';

@Component({
  selector: 'liow-deed-preview-modal',
  templateUrl: './deed-preview.component.html',
  styleUrls: ['./deed-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedPreviewModalComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;

  deed$: Observable<Deed>;

  constructor(
    private actService: ActService,
    private deedService: DeedService,
    public state: StateService,
  ) { }

  ngOnInit(): void {
    this.deed$ = this.state.modal.deedPreview$
      .map((state: ModalState) => {
        if (state.isOpen && !this.modal.isShown) {
          this.modal.show();
        } else if (!state.isOpen && this.modal.isShown) {
          this.modal.hide();
        }

        const options = <DeedPreviewModalOptions>state.options;
        return has(options, 'deed') ? options.deed : {};
      })
      .switchMap((deed?: Deed) => this.deedService.findOne({ _id: deed._id })
        .do(() => this.actService.count({ deed: deed._id }))
        .catch(() => Observable.of(null)));
  }

  onClose(): void {
    this.state.modal.deedPreview$.next({ isOpen: false });
  }
}

interface DeedPreviewModalOptions {
  deed: Deed;
}
