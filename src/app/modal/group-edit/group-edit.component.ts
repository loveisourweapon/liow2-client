import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { has } from 'lodash';

import { State as AppState } from '../../store/reducer';
import { Group, NewGroup } from '../../store/group';
import * as group from '../../store/group/group.actions';
import * as modal from '../../store/modal/modal.actions';
import { State as GroupEditModalState } from '../../store/modal/group-edit';
import * as groupEditModal from '../../store/modal/group-edit/group-edit.actions';
import { User } from '../../store/user';

@Component({
  selector: 'liow-group-edit-modal',
  templateUrl: './group-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupEditModalComponent implements OnChanges {
  @Input() isAuthenticated: boolean;
  @Input() authUser: User;
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
        this.initAuthUser();
        this.modal.show();
      } else if (!this.state.isOpen && this.modal.isShown) {
        this.modal.hide();
      }
    }

    if (has(changes, 'authUser.currentValue')) {
      this.initAuthUser();
    }
  }

  save(groupToSave: Group|NewGroup, setupCampaign): void {
    const action = has(groupToSave, '_id')
      ? new group.UpdateAction(<Group>groupToSave)
      : new group.CreateAction({ group: <NewGroup>groupToSave, setupCampaign })
      ;

    this.store.dispatch(action);
  }

  onUpdatePropertyAction(property: string, value: any): void {
    if (value !== null) {
      this.store.dispatch(new groupEditModal[`Update${property}Action`](value));
    }
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

  private initAuthUser(): void {
    if (!this.state.group['_id'] && this.authUser) {
      this.onUpdatePropertyAction('GroupUsers', [this.authUser]);
      this.onUpdatePropertyAction('Admins', [this.authUser._id]);
    }
  }
}
