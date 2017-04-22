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

import { Group } from '../../core/models';
import { GroupService, StateService, TitleService } from '../../core/services';
import { identifyBy, SearchParams } from '../../shared';

@Component({
  templateUrl: './groups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit, OnDestroy {
  query$ = new BehaviorSubject<string>('');
  page$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(20);
  numberOfPages$ = new BehaviorSubject<number>(1);
  numberOfGroups$: Observable<number>;
  filterParams$: Observable<SearchParams>;

  @ViewChild('welcomeMessageModal') welcomeMessageModal: ModalDirective;
  welcomeMessage: string;
  welcomeMessageTitle: string;

  identifyBy = identifyBy;

  private groupsSubscription: Subscription;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    public state: StateService,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.filterParams$ = Observable.combineLatest(
      this.query$,
      this.page$,
      this.pageSize$,
    )
      .distinctUntilChanged()
      .map(([query, page, limit]: [string, number, number]) => (<SearchParams>{
        query,
        limit,
        skip: (page - 1) * limit,
        sort: '-_id',
      }));

    this.groupsSubscription = this.filterParams$
      .switchMap((searchParams: SearchParams) => this.groupService.find(searchParams))
      .subscribe((groups: Group[]) => this.state.controlPanel.groups = groups);
    this.numberOfGroups$ = this.filterParams$
      .switchMap((searchParams: SearchParams) => this.groupService.count(searchParams));

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
}
