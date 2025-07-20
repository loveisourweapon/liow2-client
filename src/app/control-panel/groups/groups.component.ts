import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Group, JsonPatchOp } from '../../core/models';
import {
  AlertifyService,
  AuthService,
  GroupService,
  StateService,
  TitleService,
} from '../../core/services';
import { identifyBy, SearchParams } from '../../shared';

@Component({
  templateUrl: './groups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit, OnDestroy {
  query$ = new BehaviorSubject<string>('');
  page$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(20);
  refetch$ = new BehaviorSubject<Date>(new Date());
  numberOfPages$ = new BehaviorSubject<number>(1);
  numberOfGroups$: Observable<number>;
  filterParams$: Observable<SearchParams>;
  isApprovingGroup$ = new BehaviorSubject<boolean>(false);

  @ViewChild('welcomeMessageModal') welcomeMessageModal: ModalDirective;
  welcomeMessage: string;
  welcomeMessageTitle: string;

  @ViewChild('confirmRemoveModal') confirmRemoveModal: ModalDirective;
  removeGroup: Group | undefined;
  isRemovingGroup$ = new BehaviorSubject<boolean>(false);

  identifyBy = identifyBy;

  private groupsSubscription: Subscription;

  constructor(
    private alertify: AlertifyService,
    private auth: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    public state: StateService,
    private title: TitleService
  ) {}

  ngOnInit(): void {
    this.filterParams$ = Observable.combineLatest(
      this.query$,
      this.page$,
      this.pageSize$,
      this.refetch$
    )
      .distinctUntilChanged()
      .map(
        ([query, page, limit, _refetch]: [string, number, number, Date]) =>
          <SearchParams>{
            query,
            limit,
            skip: (page - 1) * limit,
            sort: '-_id',
            includeArchived: true,
          }
      );

    this.groupsSubscription = this.filterParams$
      .switchMap((searchParams: SearchParams) => this.groupService.find(searchParams))
      .subscribe((groups: Group[]) => (this.state.controlPanel.groups = groups));
    this.numberOfGroups$ = this.filterParams$.switchMap((searchParams: SearchParams) =>
      this.groupService.count(searchParams)
    );

    // Get initial router params
    this.route.queryParams
      .first()
      .subscribe((queryParams: Params) => this.query$.next(queryParams.query || ''));

    this.title.set(`Groups | Control Panel`);
  }

  ngOnDestroy(): void {
    this.groupsSubscription.unsubscribe();
  }

  onSearch(query: string): void {
    this.query$.next(query);
    this.page$.next(1);
    this.router.navigate([], {
      queryParams: { query },
    });
  }

  openWelcomeMessage(group: Group): void {
    this.welcomeMessage = group.welcomeMessage;
    this.welcomeMessageTitle = `${group.name} Welcome Message`;
    this.welcomeMessageModal.show();
  }

  closeWelcomeMessage(): void {
    if (this.welcomeMessageModal.isShown) {
      this.welcomeMessageModal.hide();
    }
  }

  handleApproveGroup(group: Group): void {
    this.isApprovingGroup$.next(true);
    this.groupService
      .approve(group)
      .finally(() => this.isApprovingGroup$.next(false))
      .subscribe(
        () => {
          this.alertify.success(`Approved group`);
          this.auth.loadCurrentUser();
          this.refetch$.next(new Date());
        },
        () => this.alertify.error(`Failed approving group`)
      );
  }

  confirmRemoveGroup(group: Group): void {
    this.removeGroup = group;
    this.confirmRemoveModal.show();
  }

  handleRemoveGroup(group: Group): void {
    this.isRemovingGroup$.next(true);
    this.groupService
      .delete(group)
      .finally(() => this.isRemovingGroup$.next(false))
      .subscribe(
        () => {
          this.alertify.success(`Removed group`);
          this.confirmRemoveModal.hide();
          this.removeGroup = undefined;
          this.auth.loadCurrentUser();
          this.refetch$.next(new Date());
        },
        () => this.alertify.error(`Failed removing group`)
      );
  }

  setArchived(group: Group, isArchived: boolean): void {
    this.groupService
      .update(group, [
        {
          op: JsonPatchOp.Replace,
          path: `/archived`,
          value: isArchived,
        },
      ])
      .subscribe(
        () => {
          this.alertify.success(
            `${isArchived ? `Archived` : `Unarchived`} group <b>${group.name}</b>`
          );
          this.auth.loadCurrentUser();
          this.refetch$.next(new Date());
        },
        () => this.alertify.error(`Failed ${isArchived ? `archiving` : `unarchiving`} group`)
      );
  }
}
