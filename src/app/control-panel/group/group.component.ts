import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { has, some } from 'lodash';

import { TitleService } from '../../core';
import * as fromRoot from '../../store/reducer';
import * as groupControlPanel from '../../store/control-panel/group/group.actions';
import { State as GroupControlPanelState } from '../../store/control-panel/group/group.reducer';
import { Group, GroupId } from '../../store/group';
import { User } from '../../store/user';

@Component({
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnInit, OnDestroy {
  authUser$: Observable<User>;
  state$: Observable<GroupControlPanelState>;
  groupCounter$: Observable<number>;

  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.state$ = this.store.select(fromRoot.getGroupControlPanel);
    this.groupCounter$ = this.store.select(fromRoot.getControlPanelGroupCount);
    this.title.set(`Group | Control Panel`);

    this.routeSubscription = this.route.params
      .map((params: Params) => params['groupId'])
      .filter((groupId: GroupId) => Boolean(groupId))
      .distinctUntilChanged()
      .subscribe((groupId: GroupId) =>
        this.store.dispatch(new groupControlPanel.FindAndSetGroupAction({ _id: groupId })));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
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

  updateGroup(): void { }
  leaveGroup(): void { }
}
