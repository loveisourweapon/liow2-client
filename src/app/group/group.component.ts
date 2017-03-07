import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { has, some } from 'lodash';

import { TitleService } from '../core';
import { Group, GroupSlug, GroupTab } from '../store/group';
import * as group from '../store/group/group.actions';
import * as modal from '../store/modal.actions';
import { User } from '../store/user';
import * as fromRoot from '../store/reducer';

@Component({
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnDestroy, OnInit {
  group$: Observable<Group>;
  groupCounter$: Observable<number>;
  isAuthenticated$: Observable<boolean>;
  authUser$: Observable<User>;
  currentTab$: Observable<GroupTab>;

  tabs = GroupTab;

  private routeSubscription: Subscription;
  private groupSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.group$ = this.store.select(fromRoot.getCurrentGroup);
    this.groupCounter$ = this.store.select(fromRoot.getCurrentGroupCount);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.currentTab$ = this.store.select(fromRoot.getCurrentGroupTab);

    this.routeSubscription = this.route.params
      .map((params: Params) => params['groupSlug'])
      .filter((groupSlug: GroupSlug) => Boolean(groupSlug))
      .distinctUntilChanged()
      .subscribe((groupSlug: GroupSlug) => this.store.dispatch(new group.FindAndSetCurrentAction({ urlName: groupSlug })));

    this.groupSubscription = this.group$
      .filter((group: Group) => group !== null)
      .subscribe((group: Group) => this.title.set(group.name));

    this.userSubscription = this.isMemberOfGroup$(this.authUser$, this.group$)
      .distinctUntilChanged()
      .subscribe((isMemberOfGroup: boolean) =>
        this.store.dispatch(new group.SetCurrentTabAction(isMemberOfGroup ? GroupTab.Feed : GroupTab.Welcome)));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  isMemberOfGroup$(user$: Observable<User>, group$: Observable<Group>): Observable<boolean> {
    return Observable.combineLatest(user$, group$)
      .distinctUntilChanged()
      .map(([user, group]: [User, Group]) => (
        has(user, 'groups') &&
        has(group, '_id') &&
        some(user.groups, (userGroup: Group) => userGroup._id === group._id)
      ));
  }

  setCurrentTab(currentTab: GroupTab): void {
    this.store.dispatch(new group.SetCurrentTabAction(currentTab));
  }

  openLoginModal(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }
}
