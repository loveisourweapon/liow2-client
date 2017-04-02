import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { identifyBy } from '../../shared';
import * as fromRoot from '../../store/reducer';
import * as auth from '../../store/auth/auth.actions';
import { Group } from '../../store/group';
import * as layout from '../../store/layout/layout.actions';
import * as modal from '../../store/modal/modal.actions';
import { User } from '../../store/user';

@Component({
  selector: 'liow-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  authUser$: Observable<User>;
  authGroup$: Observable<Group>;
  isAuthenticated$: Observable<boolean>;
  isSmallScreen$: Observable<boolean>;
  globalCounter$: Observable<number>;

  identifyBy = identifyBy;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.authGroup$ = this.store.select(fromRoot.getAuthGroup);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.isSmallScreen$ = this.store.select(fromRoot.getIsSmallScreen);
    this.globalCounter$ = this.store.select(fromRoot.getGlobalCount);
  }

  openMenu(): void {
    this.store.dispatch(new layout.SetIsMenuOpenAction(true));
  }

  openLogin(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }

  openSignup(): void {
    this.store.dispatch(new modal.OpenSignupAction());
  }

  openGroupEdit(): void {
    this.store.dispatch(new modal.OpenGroupEditAction());
  }

  setCurrentGroup(group: Group): void {
    this.store.dispatch(new auth.SetCurrentGroupAction(group));
  }

  logout(): void {
    this.store.dispatch(new auth.LogoutAction());
  }
}
