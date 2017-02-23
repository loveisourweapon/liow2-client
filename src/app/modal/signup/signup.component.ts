import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap';
import { assign, has } from 'lodash';

import { NewUser } from '../../store/user';
import { Group } from '../../store/group';
import * as auth from '../../store/auth/auth.actions';
import * as modal from '../../store/modal.actions';
import { State as SignupModalState } from '../../store/signup-modal';
import * as signupModal from '../../store/signup-modal/signup-modal.actions';
import { State as AppState } from '../../store/reducer';

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

  signup(newUser: NewUser, joinGroup: boolean, group: Group): void {
    if (group && joinGroup) {
      newUser = assign({}, newUser, { groups: [group._id] });
    }

    this.store.dispatch(new auth.SignupAction(newUser));
  }

  authenticateFacebook(joinGroup: boolean, group: Group): void {
    const userData: any = {};
    if (group && joinGroup) { userData.group = group._id; }

    this.store.dispatch(new auth.LoginWithFacebookAction(userData));
  }

  onUpdatePropertyAction(property: string, value: boolean|string): void {
    this.store.dispatch(new signupModal[`Update${property}Action`](value));
  }

  onClose(): void {
    this.store.dispatch(new signupModal.CloseAction());
  }

  openLogin(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }
}
