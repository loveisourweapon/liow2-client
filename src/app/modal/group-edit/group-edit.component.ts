import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap';
import { has } from 'lodash';

import { State as GroupEditModalState } from '../../store/group-edit-modal';
import * as groupEditModal from '../../store/group-edit-modal/group-edit-modal.actions';
import * as group from '../../store/group/group.actions';
import { Group, NewGroup } from '../../store/group';
import * as modal from '../../store/modal.actions';
import { State as AppState } from '../../store/reducer';

@Component({
  selector: 'liow-group-edit-modal',
  templateUrl: './group-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupEditModalComponent implements OnChanges {
  @Input() isAuthenticated: boolean;
  @Input() state = <GroupEditModalState>null;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('form') form: NgForm;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (has(changes, 'state.currentValue')) {
      if (this.state.isOpen && !this.modal.isShown) {
        this.form.resetForm();
        this.modal.show();
      } else if (!this.state.isOpen && this.modal.isShown) {
        this.modal.hide();
      }
    }
  }

  save(groupToSave: Group|NewGroup, setupCampaign): void {
    this.store.dispatch(new group.CreateAction({ group: groupToSave, setupCampaign }));
  }

  onUpdatePropertyAction(property: string, value: boolean|string): void {
    this.store.dispatch(new groupEditModal[`Update${property}Action`](value));
  }

  onClose(): void {
    this.store.dispatch(new groupEditModal.CloseAction());
  }

  openLogin(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }

  openSignup(): void {
    this.store.dispatch(new modal.OpenSignupAction());
  }
}
