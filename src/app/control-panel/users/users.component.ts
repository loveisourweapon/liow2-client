import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { has } from 'lodash';
import { ModalDirective } from 'ngx-bootstrap/modal';
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

import { Group, GroupId, JsonPatchOp, User } from '../../core/models';
import {
  AlertifyService,
  AuthService,
  EnvironmentService,
  StateService,
  TitleService,
  UserService,
} from '../../core/services';
import { identifyBy, SearchParams } from '../../shared';

@Component({
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  groupId$ = new BehaviorSubject<GroupId>(null);
  query$ = new BehaviorSubject<string>('');
  page$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(20);
  refetch$ = new BehaviorSubject<Date>(new Date());
  numberOfPages$ = new BehaviorSubject<number>(1);
  numberOfUsers$: Observable<number>;
  filterParams$: Observable<SearchParams>;

  @ViewChild('confirmRemoveModal') confirmRemoveModal: ModalDirective;
  @ViewChild('confirmDeleteModal') confirmDeleteModal: ModalDirective;
  removeUser: User | undefined;
  isRemovingUser$ = new BehaviorSubject<boolean>(false);

  identifyBy = identifyBy;

  private usersSubscription: Subscription;
  private groupIdSubscription: Subscription;

  constructor(
    public env: EnvironmentService,
    public auth: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    public state: StateService,
    private title: TitleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.title.set(`Users | Control Panel`);

    this.groupIdSubscription = this.route.parent.params
      .filter((params: Params) => has(params, 'groupId'))
      .map((params: Params) => params.groupId)
      .do((groupId: GroupId) => this.groupId$.next(groupId))
      .switchMap(() => this.state.controlPanel.group$)
      .filter((group: Group) => group !== null)
      .subscribe((group: Group) => this.title.set(`Users | ${group.name} | Control Panel`));

    this.filterParams$ = Observable.combineLatest(
      this.groupId$,
      this.query$,
      this.page$,
      this.pageSize$,
      this.refetch$
    )
      .distinctUntilChanged()
      .map(
        ([groupId, query, page, limit, _refetch]: [GroupId, string, number, number, Date]) =>
          <SearchParams>{
            groups: groupId || undefined,
            query,
            limit,
            skip: (page - 1) * limit,
            sort: '-_id',
          }
      );

    this.usersSubscription = this.filterParams$
      .switchMap((searchParams: SearchParams) => this.userService.find(searchParams))
      .subscribe((users: User[]) => (this.state.controlPanel.users = users));
    this.numberOfUsers$ = this.filterParams$.switchMap((searchParams: SearchParams) =>
      this.userService.count(searchParams)
    );

    // Get initial router params
    this.route.queryParams
      .first()
      .subscribe((queryParams: Params) => this.query$.next(queryParams.query || ''));
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
    this.groupIdSubscription.unsubscribe();
  }

  isAdmin(user: User, group: Group): boolean {
    return has(group, 'admins') && has(user, '_id') && group.admins.indexOf(user._id) !== -1;
  }

  onSearch(query: string): void {
    this.query$.next(query);
    this.page$.next(1);
    this.router.navigate([], {
      queryParams: { query },
    });
  }

  confirmRemoveUser(user: User, group: Group): void {
    if (user.superAdmin || this.isAdmin(user, group)) {
      return this.alertify.error(`Cannot remove an admin`);
    }

    this.removeUser = user;
    this.confirmRemoveModal.show();
  }

  handleRemoveUser(user: User): void {
    this.isRemovingUser$.next(true);
    this.groupId$
      .take(1)
      .map((groupId) => user.groups.findIndex((userGroupId: any) => userGroupId === groupId))
      .switchMap((index: number) =>
        this.userService.update(user, [
          {
            op: JsonPatchOp.Remove,
            path: `/groups/${index}`,
          },
        ])
      )
      .finally(() => this.isRemovingUser$.next(false))
      .subscribe(
        () => {
          this.alertify.success(`Removed user`);
          this.confirmRemoveModal.hide();
          this.refetch$.next(new Date());
        },
        () => this.alertify.error(`Failed removing user`)
      );
  }

  confirmDeleteUser(user: User): void {
    if (user.superAdmin) {
      return this.alertify.error(`Cannot delete a super admin`);
    }

    this.removeUser = user;
    this.confirmDeleteModal.show();
  }

  handleDeleteUser(user: User): void {
    this.isRemovingUser$.next(true);
    this.userService
      .delete(user)
      .finally(() => this.isRemovingUser$.next(false))
      .subscribe(
        () => {
          this.alertify.success(`Deleted user`);
          this.confirmDeleteModal.hide();
          this.removeUser = undefined;
          this.refetch$.next(new Date());
        },
        () => this.alertify.error(`Failed deleting user`)
      );
  }
}
