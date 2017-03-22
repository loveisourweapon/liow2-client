import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { capitalize } from 'lodash';

import { User } from '../store/user';
import * as fromRoot from '../store/reducer';

@Component({
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  authUser$: Observable<User>;
  activePage$: Observable<string>;

  private superAdminPages = ['Deeds', 'Groups', 'Users'];

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);

    // Get active page from router
    this.activePage$ = this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .map((event: NavigationEnd) => {
        const [, , routePath] = event.urlAfterRedirects.split('/');
        return capitalize(routePath);
      });

    // Redirect to home if user logs out
    this.store.select(fromRoot.getIsAuthenticated)
      .filter((isAuthenticated: boolean) => isAuthenticated === false)
      .take(1)
      .subscribe(() => this.store.dispatch(go('/')));

    // Redirect to user control panel if user doesn't have access
    Observable.combineLatest(
      this.authUser$.filter((user: User) => user !== null && !user.superAdmin),
      this.activePage$.filter((activePage: string) => this.superAdminPages.includes(activePage)),
    )
      .take(1)
      .subscribe(() => this.store.dispatch(go('/control-panel')));
  }
}
