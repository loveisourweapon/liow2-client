import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../store/reducer';
import { Group } from '../store/group';
import { User } from '../store/user';
import { State as CampaignEditModalState } from '../store/modal/campaign-edit';
import { State as DeedPreviewModalState } from '../store/modal/deed-preview';
import { State as ForgotPasswordModalState } from '../store/modal/forgot-password';
import { State as GroupEditModalState } from '../store/modal/group-edit';
import { State as LoginModalState } from '../store/modal/login';
import { State as SignupModalState } from '../store/modal/signup';

@Component({
  selector: 'liow-modals',
  templateUrl: './modals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalsComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  authUser$: Observable<User>;
  currentGroup$: Observable<Group>;
  campaignEditModal$: Observable<CampaignEditModalState>;
  deedPreviewModal$: Observable<DeedPreviewModalState>;
  forgotPasswordModal$: Observable<ForgotPasswordModalState>;
  groupEditModal$: Observable<GroupEditModalState>;
  loginModal$: Observable<LoginModalState>;
  signupModal$: Observable<SignupModalState>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.campaignEditModal$ = this.store.select(fromRoot.getCampaignEditModal);
    this.deedPreviewModal$ = this.store.select(fromRoot.getDeedPreviewModal);
    this.forgotPasswordModal$ = this.store.select(fromRoot.getForgotPasswordModal);
    this.groupEditModal$ = this.store.select(fromRoot.getGroupEditModal);
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
