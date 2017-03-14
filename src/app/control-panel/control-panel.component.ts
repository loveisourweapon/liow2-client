import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { capitalize } from 'lodash';

import { User } from '../store/user';
import * as fromRoot from '../store/reducer';

@Component({
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  authUser$: Observable<User>;
  activePage: string;

  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);

    this.routerSubscription = this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const [, , routePath] = event.urlAfterRedirects.split('/');
        this.activePage = capitalize(routePath);
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
