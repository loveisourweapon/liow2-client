import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { search } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TitleService } from '../../core';
import { identifyBy } from '../../shared';
import * as fromRoot from '../../store/reducer';
import * as usersControlPanel from '../../store/control-panel/users/users.actions';
import * as fromUsersControlPanel from '../../store/control-panel/users/users.reducer';
import { User } from '../../store/user';

@Component({
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  authUser$: Observable<User>;
  state$: Observable<fromUsersControlPanel.State>;

  identifyBy = identifyBy;

  private routerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.state$ = this.store.select(fromRoot.getUsersControlPanel);
    this.title.set(`Users | Control Panel`);

    this.routerSubscription = this.route.queryParams
      .distinctUntilChanged()
      .map((queryParams: Params) => queryParams.query || '')
      .subscribe((query: string) => {
        this.store.dispatch(new usersControlPanel.UpdateQueryAction(query));
        this.store.dispatch(new usersControlPanel.UpdatePageAction(1));
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  onSearch(query: string): void {
    this.store.dispatch(search({ query }));
  }

  onPageChanged(page: number): void {
    this.store.dispatch(new usersControlPanel.UpdatePageAction(page));
  }

  onNumPagesChanged(numberOfPages: number): void {
    this.store.dispatch(new usersControlPanel.UpdateNumberOfPagesAction(numberOfPages));
  }
}
