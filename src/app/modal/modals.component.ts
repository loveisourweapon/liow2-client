import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Group } from '../store/models';
import * as fromRoot from '../store/reducers';
import { State as LoginModalState } from '../store/reducers/modal/login';
import { State as SignupModalState } from '../store/reducers/modal/signup';

@Component({
  selector: 'liow-modals',
  templateUrl: './modals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalsComponent implements OnInit {
  currentGroup$: Observable<Group>;
  loginModal$: Observable<LoginModalState>;
  signupModal$: Observable<SignupModalState>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.currentGroup$ = this.store.select(fromRoot.getCurrentGroup);
    this.loginModal$ = this.store.select(fromRoot.getLoginModal);
    this.signupModal$ = this.store.select(fromRoot.getSignupModal);
  }
}
