import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { has, some } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Group, GroupId, User } from '../../core/models';
import { ActService, GroupService, ModalService, StateService, TitleService, UserService } from '../../core/services';
import { SearchParams } from '../../shared';

@Component({
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnInit, OnDestroy {
  group$ = new BehaviorSubject<Group>(null);
  numberOfMembers$: Observable<number>;
  isChildRouteActive = 0;

  private routeSubscription: Subscription;

  constructor(
    private actservice: ActService,
    private groupService: GroupService,
    public modal: ModalService,
    private route: ActivatedRoute,
    public state: StateService,
    private title: TitleService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params
      .filter((params: Params) => has(params, 'groupId'))
      .map((params: Params) => params.groupId)
      .switchMap((groupId: GroupId) => this.groupService.findOne({ _id: groupId }))
      .do((group: Group) => this.title.set(`${group.name} | Control Panel`))
      .subscribe((group: Group) => this.group$.next(group));

    this.numberOfMembers$ = this.group$
      .do((group: Group) => this.actservice.count({ group: group._id }))
      .map((group: Group) => (<SearchParams>{ groups: group._id }))
      .switchMap((searchParams: SearchParams) => this.userService.count(searchParams));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  setChildRouteActive(value) {
    this.isChildRouteActive += value;
  }

  isUserAn$(
    predicate: (User, Group) => boolean,
    user$: Observable<User>,
    group$: Observable<Group>,
  ): Observable<boolean> {
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

  leaveGroup(user: User, group: Group): void { }
}
