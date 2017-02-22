import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap';
import { has } from 'lodash';

import * as auth from '../../store/auth';
import { State as ForgotPasswordModalState } from '../../store/forgot-password-modal';
import * as forgotPasswordModal from '../../store/forgot-password-modal/forgot-password-modal.actions';
import { State as AppState } from '../../store/reducer';

@Component({
  selector: 'liow-forgot-password-modal',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordModalComponent implements OnChanges {
  // Issue with exported interface 'fromLoginModal.State'
  // https://github.com/angular/angular-cli/issues/2034
  @Input() state = <ForgotPasswordModalState>null;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('form') form: NgForm;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (has(changes, 'state.currentValue')) {
      if (this.state.isOpen && !this.modal.isShown) {
        this.form.resetForm();
        this.onUpdatePropertyAction('EmailAddress', this.state.emailAddress);
        this.modal.show();
      } else if (!this.state.isOpen && this.modal.isShown) {
        this.modal.hide();
      }
    }
  }

  send(emailAddress: string): void {
    this.store.dispatch(new auth.SendForgotPasswordAction(emailAddress));
  }

  onUpdatePropertyAction(property: string, value: string|boolean): void {
    this.store.dispatch(new forgotPasswordModal[`Update${property}Action`](value));
  }

  onClose(): void {
    this.store.dispatch(new forgotPasswordModal.CloseAction());
  }
}
