import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Group, User } from '../store/models';
import * as act from '../store/actions/act';
import * as fromRoot from '../store/reducers';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthenticated$: Observable<boolean>;
  authUser$: Observable<User>;
  counters$: Observable<{ [key: string]: number }>;

  private userSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.counters$ = this.store.select(fromRoot.getCountersState);

    this.userSubscription = this.authUser$
      .filter((user: User) => user !== null)
      .subscribe((user: User) =>
        user.groups.forEach((group: Group) =>
          this.store.dispatch(new act.CountAction({ group: group._id }))));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
