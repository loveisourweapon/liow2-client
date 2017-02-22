import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TitleService } from '../core';
import { User, UserId } from '../store/user';
import * as modal from '../store/modal.actions';
import * as user from '../store/user/user.actions';
import * as fromRoot from '../store/reducer';

@Component({
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnDestroy, OnInit {
  user$: Observable<User>;
  userCounter$: Observable<number>;
  isAuthenticated$: Observable<boolean>;

  private routeSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(fromRoot.getCurrentUser);
    this.userCounter$ = this.store.select(fromRoot.getCurrentUserCount);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);

    this.routeSubscription = this.route.params.map((params: Params) => params['userId'])
      .distinctUntilChanged()
      .subscribe((userId: UserId) => this.store.dispatch(new user.GetAndSetCurrentAction(userId)));

    this.userSubscription = this.user$
      .filter((user: User) => user !== null)
      .subscribe((user: User) => this.title.set(user.name));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  openLogin(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }
}
