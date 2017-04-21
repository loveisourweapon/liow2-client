import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { has } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { GroupId, User } from '../../core/models';
import { StateService, TitleService, UserService } from '../../core/services';
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
  numberOfPages$ = new BehaviorSubject<number>(1);
  numberOfUsers$: Observable<number>;
  filterParams$: Observable<SearchParams>;

  identifyBy = identifyBy;

  private usersSubscription: Subscription;
  private groupIdSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public state: StateService,
    private title: TitleService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.groupIdSubscription = this.route.parent.params
      .filter((params: Params) => has(params, 'groupId'))
      .map((params: Params) => params.groupId)
      .subscribe((groupId: GroupId) => this.groupId$.next(groupId));

    this.filterParams$ = Observable.combineLatest(
      this.groupId$,
      this.query$,
      this.page$,
      this.pageSize$,
    )
      .distinctUntilChanged()
      .map(([groupId, query, page, limit]: [GroupId, string, number, number]) => (<SearchParams>{
        groups: groupId || undefined,
        query,
        limit,
        skip: (page - 1) * limit,
        sort: '-_id',
      }));

    this.usersSubscription = this.filterParams$
      .switchMap((searchParams: SearchParams) => this.userService.find(searchParams))
      .subscribe((users: User[]) => this.state.controlPanel.users = users);
    this.numberOfUsers$ = this.filterParams$
      .switchMap((searchParams: SearchParams) => this.userService.count(searchParams));

    // Get initial router params
    this.route.queryParams
      .first()
      .subscribe((queryParams: Params) => this.query$.next(queryParams.query || ''));

    this.title.set(`Users | Control Panel`);
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
    this.groupIdSubscription.unsubscribe();
  }

  onSearch(query: string): void {
    this.query$.next(query);
    this.page$.next(1);
    this.router.navigate([], {
      queryParams: { query },
    });
  }
}
