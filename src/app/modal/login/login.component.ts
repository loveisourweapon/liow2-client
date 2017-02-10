import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap';
import { has } from 'lodash';

import { Credentials, Group } from '../../store/models';
import * as auth from '../../store/actions/auth';
import * as modal from '../../store/actions/modal';
import * as loginModal from '../../store/actions/modal/login';
import { State as LoginModalState } from '../../store/reducers/modal/login';
import { State as AppState } from '../../store/reducers';

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

  constructor(
    private store: Store<AppState>,
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

  authenticateEmail(credentials: Credentials, joinGroup: boolean): void {
    if (joinGroup) { credentials.group = this.group._id; }

    this.store.dispatch(new auth.LoginWithEmailAction(credentials));
  }

  authenticateFacebook(joinGroup: boolean): void {
    const userData: any = {};
    if (joinGroup) { userData.group = this.group._id; }

    this.store.dispatch(new auth.LoginWithFacebookAction(userData));
  }

  onUpdatePropertyAction(property: string, value: string): void {
    this.store.dispatch(new loginModal[`Update${property}Action`](value));
  }

  onClose(): void {
    this.store.dispatch(new loginModal.CloseAction());
  }

  openForgotPassword(email: string): void {
    // this.store.dispatch(new modal.OpenForgotPassword(email));
  }

  openSignup(): void {
    this.store.dispatch(new modal.OpenSignupAction());
  }
}