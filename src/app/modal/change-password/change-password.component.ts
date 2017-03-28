import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { has } from 'lodash';

import { State as AppState } from '../../store/reducer';
import * as auth from '../../store/auth/auth.actions';
import { State as ChangePasswordModalState } from '../../store/modal/change-password';
import * as changePasswordModal from '../../store/modal/change-password/change-password.actions';
import { User } from '../../store/user';

@Component({
  selector: 'liow-change-password-modal',
  templateUrl: './change-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordModalComponent implements OnChanges {
  @Input() state = <ChangePasswordModalState>null;
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

  save(user: User, currentPassword: string, newPassword: string): void {
    this.store.dispatch(new auth.ChangePasswordAction({ user, currentPassword, newPassword }));
  }

  onUpdatePropertyAction(property: string, value: string): void {
    if (value !== null) {
      this.store.dispatch(new changePasswordModal[`Update${property}Action`](value));
    }
  }

  onClose(): void {
    this.store.dispatch(new changePasswordModal.CloseAction());
  }
}
