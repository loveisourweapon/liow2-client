import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { User, UserId } from '../store/models';
import * as loginModal from '../store/actions/modal/login';
import * as user from '../store/actions/user';
import * as fromRoot from '../store/reducers';

@Component({
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  user$: Observable<User>;
  userCounter$: Observable<number>;
  isAuthenticated$: Observable<boolean>;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(fromRoot.getCurrentUser);
    this.userCounter$ = this.store.select(fromRoot.getCurrentUserCount);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);

    this.subscription = this.route.params.map((params: Params) => params['userId'])
      .distinctUntilChanged()
      .subscribe((userId: UserId) => this.store.dispatch(new user.GetAndSetCurrentAction(userId)));
  }

  openLogin(): void {
    this.store.dispatch(new loginModal.OpenAction());
  }
}
