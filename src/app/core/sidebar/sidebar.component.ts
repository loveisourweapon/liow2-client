import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { identifyBy } from '../../shared';
import * as fromRoot from '../../store/reducer';
import * as auth from '../../store/auth/auth.actions';
import { Group } from '../../store/group';
import * as layout from '../../store/layout/layout.actions';
import * as modal from '../../store/modal/modal.actions';
import { User } from '../../store/user';

@Component({
  selector: 'liow-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  authUser$: Observable<User>;
  authGroup$: Observable<Group>;
  isAuthenticated$: Observable<boolean>;
  isMenuOpen$: Observable<boolean>;
  isSmallScreen$: Observable<boolean>;

  identifyBy = identifyBy;

  private bodySubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.authGroup$ = this.store.select(fromRoot.getAuthGroup);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.isMenuOpen$ = this.store.select(fromRoot.getIsMenuOpen);
    this.isSmallScreen$ = this.store.select(fromRoot.getIsSmallScreen);

    // Add/remove the .modal-open class to the document body to prevent scrolling
    const bodyElement = document.querySelector('body');
    this.bodySubscription = Observable.combineLatest(this.isSmallScreen$, this.isMenuOpen$)
      .map(([isSmallScreen, isMenuOpen]: [boolean, boolean]) => isSmallScreen && isMenuOpen)
      .distinctUntilChanged()
      .subscribe((isShowing) => bodyElement.classList[isShowing ? 'add' : 'remove']('modal-open'));
  }

  ngOnDestroy(): void {
    this.bodySubscription.unsubscribe();
  }

  closeMenu(): void {
    this.store.dispatch(new layout.SetIsMenuOpenAction(false));
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
