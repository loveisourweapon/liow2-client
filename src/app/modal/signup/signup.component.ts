import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap';
import { has } from 'lodash';

import { NewUser, Group } from '../../store/models';
import * as auth from '../../store/actions/auth';
import * as modal from '../../store/actions/modal';
import * as signupModal from '../../store/actions/modal/signup';
import { State as SignupModalState } from '../../store/reducers/modal/signup';
import { State as AppState } from '../../store/reducers';

@Component({
  selector: 'liow-signup-modal',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupModalComponent implements OnChanges {
  // Issue with exported interface 'fromSignupModal.State'
  // https://github.com/angular/angular-cli/issues/2034
  @Input() state = <SignupModalState>null;
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

  signup(newUser: NewUser, joinGroup: boolean): void {
    if (joinGroup) { newUser.groups = [this.group._id]; }

    this.store.dispatch(new auth.SignupAction(newUser));
  }

  authenticateFacebook(joinGroup: boolean): void {
    const userData: any = {};
    if (joinGroup) { userData.group = this.group._id; }

    this.store.dispatch(new auth.LoginWithFacebookAction(userData));
  }

  onUpdatePropertyAction(property: string, value: string): void {
    this.store.dispatch(new signupModal[`Update${property}Action`](value));
  }

  onClose(): void {
    this.store.dispatch(new signupModal.CloseAction());
  }

  openLogin(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }
}
