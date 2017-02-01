import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Group, User } from '../../store/models';
import * as auth from '../../store/actions/auth';
import * as layout from '../../store/actions/layout';
import * as loginModal from '../../store/actions/modal/login';
import * as fromRoot from '../../store/reducers';

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
  isMenuOpen$: Observable<boolean>;
  globalCounter$: Observable<number>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.authGroup$ = this.store.select(fromRoot.getAuthGroup);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.isMenuOpen$ = this.store.select(fromRoot.getIsMenuOpen);
    this.globalCounter$ = this.store.select(fromRoot.getGlobalCount);
  }

  toggleMenu(): void {
    this.store.dispatch(new layout.ToggleMenuAction());
  }

  closeMenu(): void {
    this.store.dispatch(new layout.CloseMenuAction());
  }

  openLogin(): void {
    this.store.dispatch(new loginModal.OpenAction());
  }

  openSignup(): void {
    // this.store.dispatch(new signupModal.OpenAction());
  }

  openGroupEdit(): void {
    // this.store.dispatch(new groupEditModal.OpenAction());
  }

  setCurrentGroup(group: Group): void {
    this.store.dispatch(new auth.SetCurrentGroupAction(group));
  }

  logout(): void {
    this.store.dispatch(new auth.LogoutAction());
  }
}
