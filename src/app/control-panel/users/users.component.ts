import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { search } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { has } from 'lodash';

import { TitleService } from '../../core';
import { identifyBy } from '../../shared';
import * as fromRoot from '../../store/reducer';
import * as usersControlPanel from '../../store/control-panel/users/users.actions';
import * as fromUsersControlPanel from '../../store/control-panel/users/users.reducer';
import { GroupId } from '../../store/group';
import { User } from '../../store/user';

@Component({
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  authUser$: Observable<User>;
  state$: Observable<fromUsersControlPanel.State>;

  identifyBy = identifyBy;

  private queryParamsSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.state$ = this.store.select(fromRoot.getUsersControlPanel);
    this.title.set(`Users | Control Panel`);
    this.store.dispatch(new usersControlPanel.InitialiseAction());

    this.routeSubscription = this.route.parent.params
      .filter((params: Params) => has(params, 'groupId'))
      .map((params: Params) => params.groupId)
      .subscribe((groupId: GroupId) =>
        this.store.dispatch(new usersControlPanel.UpdateGroupIdAction(groupId)));

    this.queryParamsSubscription = this.route.queryParams
      .distinctUntilChanged()
      .map((queryParams: Params) => queryParams.query || '')
      .subscribe((query: string) => {
        this.store.dispatch(new usersControlPanel.UpdateQueryAction(query));
        this.store.dispatch(new usersControlPanel.UpdatePageAction(1));
      });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  onSearch(query: string): void {
    this.store.dispatch(search({ query }));
  }

  onCurrentPageChanged(currentPage: number): void {
    this.store.dispatch(new usersControlPanel.UpdatePageAction(currentPage));
  }

  onNumberOfPagesChanged(numberOfPages: number): void {
    this.store.dispatch(new usersControlPanel.UpdateNumberOfPagesAction(numberOfPages));
  }
}
