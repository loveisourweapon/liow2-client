import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Group } from '../store/group';
import { State as ForgotPasswordModalState } from '../store/forgot-password-modal';
import { State as LoginModalState } from '../store/login-modal';
import { State as SignupModalState } from '../store/signup-modal';
import * as fromRoot from '../store/reducer';

@Component({
  selector: 'liow-modals',
  templateUrl: './modals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalsComponent implements OnInit {
  forgotPasswordModal$: Observable<ForgotPasswordModalState>;
  loginModal$: Observable<LoginModalState>;
  signupModal$: Observable<SignupModalState>;
  currentGroup$: Observable<Group>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.forgotPasswordModal$ = this.store.select(fromRoot.getForgotPasswordModal);
    this.loginModal$ = this.store.select(fromRoot.getLoginModal);
    this.signupModal$ = this.store.select(fromRoot.getSignupModal);

    // Set the current group only if currently on a group page
    this.currentGroup$ = Observable.combineLatest(
      this.store.select(fromRoot.getCurrentGroup),
      this.store.select(fromRoot.getRouterPath).map((path: string) => /^\/g\//.test(path)),
    )
      .map(([currentGroup, isGroupPage]: [Group, boolean]) => isGroupPage ? currentGroup : null)
      .distinctUntilChanged();
  }
}
