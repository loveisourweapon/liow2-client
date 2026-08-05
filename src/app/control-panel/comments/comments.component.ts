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
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Comment, CommentStatus, Group, GroupId } from '../../core/models';
import {
  AlertifyService,
  AuthService,
  CommentService,
  EnvironmentService,
  StateService,
  TitleService,
} from '../../core/services';
import { identifyBy, SearchParams } from '../../shared';

export type StatusFilter = CommentStatus | 'all';

@Component({
  templateUrl: './comments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit, OnDestroy {
  groupId$ = new BehaviorSubject<GroupId>(null);
  query$ = new BehaviorSubject<string>('');
  status$ = new BehaviorSubject<StatusFilter>('pending');
  page$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(20);
  reload$ = new BehaviorSubject<Date>(new Date());
  numberOfPages$ = new BehaviorSubject<number>(1);
  numberOfComments$: Observable<number>;
  filterParams$: Observable<SearchParams>;

  readonly statusFilters: { value: StatusFilter; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'all', label: 'All' },
  ];

  @ViewChild('confirmRemoveModal') confirmRemoveModal: ModalDirective;
  removeComment: Comment | undefined;
  isRemovingComment$ = new BehaviorSubject<boolean>(false);

  @ViewChild('confirmRejectModal') confirmRejectModal: ModalDirective;
  rejectComment: Comment | undefined;
  isSavingComment$ = new BehaviorSubject<boolean>(false);

  identifyBy = identifyBy;

  get storyLabel(): string {
    return this.env.appId === 'liow' ? 'testimony' : 'impact story';
  }

  private commentsSubscription: Subscription;
  private groupIdSubscription: Subscription;

  constructor(
    public env: EnvironmentService,
    public auth: AuthService,
    private alertify: AlertifyService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    public state: StateService,
    private title: TitleService
  ) {}

  ngOnInit(): void {
    this.title.set(`Comments | Control Panel`);

    this.status$.next(this.defaultStatusFilter);

    this.groupIdSubscription = this.route.parent.params
      .filter((params: Params) => has(params, 'groupId'))
      .map((params: Params) => params.groupId)
      .do((groupId: GroupId) => this.groupId$.next(groupId))
      .switchMap(() => this.state.controlPanel.group$)
      .filter((group: Group) => group !== null)
      .subscribe((group: Group) =>
        this.title.set(
          `${this.env.appId === 'liow' ? 'Testimonies' : 'Stories of Impact'} | ${
            group.name
          } | Control Panel`
        )
      );

    this.filterParams$ = Observable.combineLatest(
      this.groupId$,
      this.query$,
      this.status$,
      this.page$,
      this.pageSize$,
      this.reload$
    )
      .distinctUntilChanged()
      .map(
        ([groupId, query, status, page, limit, _]: [
          GroupId,
          string,
          StatusFilter,
          number,
          number,
          Date,
        ]) =>
          <SearchParams>{
            group: groupId || undefined,
            'target.group': 'null',
            status: this.statusParam(status),
            query,
            limit,
            skip: (page - 1) * limit,
            sort: '-_id',
          }
      );

    this.commentsSubscription = this.filterParams$
      .switchMap((searchParams: SearchParams) => this.commentService.find(searchParams))
      .subscribe((comments: Comment[]) => (this.state.controlPanel.comments = comments));
    this.numberOfComments$ = this.filterParams$.switchMap((searchParams: SearchParams) =>
      this.commentService.count(searchParams)
    );

    // Get initial router params
    this.route.queryParams.first().subscribe((queryParams: Params) => {
      this.query$.next(queryParams.query || '');
      this.status$.next(this.parseStatusFilter(queryParams.status));
    });
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
    this.groupIdSubscription.unsubscribe();
  }

  onSearch(query: string): void {
    this.query$.next(query);
    this.page$.next(1);
    this.router.navigate([], {
      queryParams: { query, status: this.status$.getValue() },
    });
  }

  onStatusChange(status: StatusFilter): void {
    this.status$.next(status);
    this.page$.next(1);
    this.router.navigate([], {
      queryParams: { query: this.query$.getValue(), status },
    });
  }

  statusOf(comment: Comment): CommentStatus {
    return comment.status || 'approved';
  }

  statusLabel(comment: Comment): string {
    const status = this.statusOf(comment);
    const filter = this.findStatusFilter(status);
    return filter ? filter.label : status;
  }

  handleApproveComment(comment: Comment): void {
    this.isSavingComment$.next(true);
    this.commentService
      .approve(comment)
      .finally(() => {
        this.isSavingComment$.next(false);
      })
      .subscribe(
        () => {
          this.reload$.next(new Date());
          this.state.controlPanel.commentsChanged();
          this.alertify.success(`Approved ${this.storyLabel}`);
        },
        () => {
          this.alertify.error(`Failed approving ${this.storyLabel}`);
        }
      );
  }

  confirmRejectComment(comment: Comment): void {
    this.rejectComment = comment;
    this.confirmRejectModal.show();
  }

  handleRejectComment(comment: Comment): void {
    this.isSavingComment$.next(true);
    this.commentService
      .reject(comment)
      .finally(() => {
        this.isSavingComment$.next(false);
      })
      .subscribe(
        () => {
          this.reload$.next(new Date());
          this.state.controlPanel.commentsChanged();
          this.alertify.success(`Rejected ${this.storyLabel}`);
          this.confirmRejectModal.hide();
        },
        () => {
          this.alertify.error(`Failed rejecting ${this.storyLabel}`);
        }
      );
  }

  confirmRemoveComment(comment: Comment): void {
    this.removeComment = comment;
    this.confirmRemoveModal.show();
  }

  handleRemoveComment(comment: Comment): void {
    this.isRemovingComment$.next(true);
    this.commentService
      .remove(comment)
      .finally(() => {
        this.isRemovingComment$.next(false);
      })
      .subscribe(
        () => {
          this.reload$.next(new Date());
          this.state.controlPanel.commentsChanged();
          this.alertify.success(`Deleted comment`);
          this.confirmRemoveModal.hide();
        },
        () => {
          this.alertify.error(`Failed deleting comment`);
        }
      );
  }

  /**
   * Moderating is the job on BeKind, so the queue is what opens by default.
   * LIOW never turns approval on, so its tab keeps listing published
   * testimonies exactly as it always has.
   */
  private get defaultStatusFilter(): StatusFilter {
    return this.env.appId === 'liow' ? 'approved' : 'pending';
  }

  private findStatusFilter(value: string): { value: StatusFilter; label: string } | undefined {
    return this.statusFilters.filter((filter) => filter.value === value)[0];
  }

  private parseStatusFilter(value: string): StatusFilter {
    const filter = this.findStatusFilter(value);
    return filter ? filter.value : this.defaultStatusFilter;
  }

  /**
   * Map a filter to the `status` query param
   *
   * Approved is the server's default view, so it's left off entirely - asking
   * for it by name would exclude comments predating the status field, which
   * have no status at all. Those same comments are missing from All until they
   * are backfilled server side.
   */
  private statusParam(status: StatusFilter): string | undefined {
    switch (status) {
      case 'approved':
        return undefined;
      case 'all':
        return 'pending,approved,rejected';
      default:
        return status;
    }
  }
}
