import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap';
import { has } from 'lodash';

import { Credentials, Group } from '../../store/models';
import * as auth from '../../store/actions/auth';
import * as loginModal from '../../store/actions/modal/login';
import * as fromLoginModal from '../../store/reducers/modal/login';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'liow-login-modal',
  templateUrl: './login.component.html',
})
export class LoginModalComponent implements OnChanges {
  // TODO: fix issue with this line
  @Input() state: fromLoginModal.State;
  @Input() group: Group;
  @ViewChild('modal') modal: ModalDirective;

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

  authenticateEmail(credentials: Credentials, joinGroup: boolean): void {
    if (joinGroup) { credentials.group = this.group._id; }

    this.store.dispatch(new auth.LoginWithEmailAction(credentials));
  }

  authenticateFacebook(joinGroup: boolean): void {
    const userData: any = {};
    if (joinGroup) { userData.group = this.group._id; }

    this.store.dispatch(new auth.LoginWithFacebookAction(userData));
  }

  onUpdateEmail(email: string): void {
    this.store.dispatch(new loginModal.UpdateEmailAction(email));
  }

  onUpdatePassword(password: string): void {
    this.store.dispatch(new loginModal.UpdatePasswordAction(password));
  }

  onClose(): void {
    this.store.dispatch(new loginModal.CloseAction());
  }

  openForgotPassword(email: string): void {
    // this.store.dispatch(new modal.OpenForgotPassword(email));
  }

  openSignup(): void {
    // this.store.dispatch(new modal.OpenSignup());
  }
}
