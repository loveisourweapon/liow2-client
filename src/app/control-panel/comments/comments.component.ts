import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { has } from 'lodash';
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

import { Comment, Group, GroupId } from '../../core/models';
import { AuthService, CommentService, StateService, TitleService } from '../../core/services';
import { identifyBy, SearchParams } from '../../shared';

@Component({
  templateUrl: './comments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit, OnDestroy {
  groupId$ = new BehaviorSubject<GroupId>(null);
  query$ = new BehaviorSubject<string>('');
  page$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(20);
  numberOfPages$ = new BehaviorSubject<number>(1);
  numberOfComments$: Observable<number>;
  filterParams$: Observable<SearchParams>;

  identifyBy = identifyBy;

  private commentsSubscription: Subscription;
  private groupIdSubscription: Subscription;

  constructor(
    public auth: AuthService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    public state: StateService,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.title.set(`Comments | Control Panel`);

    this.groupIdSubscription = this.route.parent.params
      .filter((params: Params) => has(params, 'groupId'))
      .map((params: Params) => params.groupId)
      .do((groupId: GroupId) => this.groupId$.next(groupId))
      .switchMap(() => this.state.controlPanel.group$)
      .filter((group: Group) => group !== null)
      .subscribe((group: Group) => this.title.set(`Testimonies | ${group.name} | Control Panel`));

    this.filterParams$ = Observable.combineLatest(
      this.groupId$,
      this.query$,
      this.page$,
      this.pageSize$,
    )
      .distinctUntilChanged()
      .map(([groupId, query, page, limit]: [GroupId, string, number, number]) => (<SearchParams>{
        group: groupId || undefined,
        'target.group': 'null',
        query,
        limit,
        skip: (page - 1) * limit,
        sort: '-_id',
      }));

    this.commentsSubscription = this.filterParams$
      .switchMap((searchParams: SearchParams) => this.commentService.find(searchParams))
      .subscribe((comments: Comment[]) => this.state.controlPanel.comments = comments);
    this.numberOfComments$ = this.filterParams$
      .switchMap((searchParams: SearchParams) => this.commentService.count(searchParams));

    // Get initial router params
    this.route.queryParams
      .first()
      .subscribe((queryParams: Params) => this.query$.next(queryParams.query || ''));
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
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
