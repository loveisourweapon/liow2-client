import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { assign, has } from 'lodash';

import { Credentials } from '../../store/auth';
import { Group } from '../../store/group';
import * as auth from '../../store/auth';
import * as modal from '../../store/modal.actions';
import { State as LoginModalState } from '../../store/login-modal';
import * as loginModal from '../../store/login-modal/login-modal.actions';
import { State as AppState } from '../../store/reducer';

@Component({
  selector: 'liow-login-modal',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent implements OnChanges {
  // Issue with exported interface 'fromLoginModal.State'
  // https://github.com/angular/angular-cli/issues/2034
  @Input() state = <LoginModalState>null;
  @Input() group: Group;
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

  authenticateEmail(credentials: Credentials, joinGroup: boolean, group: Group): void {
    if (group && joinGroup) {
      credentials = assign({}, credentials, { group: group._id });
    }

    this.store.dispatch(new auth.LoginWithEmailAction(credentials));
  }

  authenticateFacebook(joinGroup: boolean, group: Group): void {
    const userData: any = {};
    if (group && joinGroup) { userData.group = group._id; }

    this.store.dispatch(new auth.LoginWithFacebookAction(userData));
  }

  onUpdatePropertyAction(property: string, value: boolean|string): void {
    this.store.dispatch(new loginModal[`Update${property}Action`](value));
  }

  onClose(): void {
    this.store.dispatch(new loginModal.CloseAction());
  }

  openForgotPassword(emailAddress: string): void {
    this.store.dispatch(new modal.OpenForgotPasswordAction(emailAddress));
  }

  openSignup(): void {
    this.store.dispatch(new modal.OpenSignupAction());
  }

  sendConfirmEmail(emailAddress: string): void {
    this.store.dispatch(new auth.SendConfirmEmailAction(emailAddress));
  }
}
