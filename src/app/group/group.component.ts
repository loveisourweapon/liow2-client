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
import * as user from '../store/user/user.actions';
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

    this.userSubscription = this.isUserAn$(this.memberOfGroup, this.authUser$, this.group$)
      .distinctUntilChanged()
      .subscribe((isMemberOfGroup: boolean) =>
        this.store.dispatch(new group.SetCurrentTabAction(isMemberOfGroup ? GroupTab.Feed : GroupTab.Welcome)));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  setCurrentTab(currentTab: GroupTab): void {
    this.store.dispatch(new group.SetCurrentTabAction(currentTab));
  }

  isUserAn$(predicate: (User, Group) => boolean, user$: Observable<User>, group$: Observable<Group>): Observable<boolean> {
    return Observable.combineLatest(user$, group$)
      .distinctUntilChanged()
      .map(([user, group]: [User, Group]) => predicate(user, group));
  }

  memberOfGroup(user: User, group: Group): boolean {
    return has(user, 'groups')
      && has(group, '_id')
      && some(user.groups, (userGroup: Group) => userGroup._id === group._id);
  }

  adminOfGroup(user: User, group: Group): boolean {
    return has(group, 'admins')
      && has(user, '_id')
      && group.admins.includes(user._id);
  }

  joinGroup(user$: Observable<User>, group$: Observable<Group>): void {
    Observable.combineLatest(user$, group$)
      .distinctUntilChanged()
      .first()
      .subscribe(([currentUser, group]: [User, Group]) =>
        this.store.dispatch(new user.JoinGroupAction({ user: currentUser, group })));
  }

  leaveGroup(user$: Observable<User>, group$: Observable<Group>): void {
  }

  openGroupEditModal(group$: Observable<Group>): void {
    group$.take(1)
      .subscribe((group: Group) =>
        this.store.dispatch(new modal.OpenGroupEditAction({ action: 'Update', group })));
  }

  openLoginModal(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }
}
