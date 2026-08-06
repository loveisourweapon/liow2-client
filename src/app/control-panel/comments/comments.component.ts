import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { has } from 'lodash';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
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

type FilterInputs = [GroupId, string, StatusFilter, number, number, Date];

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

  readonly statusFilters: StatusFilter[] = ['pending', 'approved', 'rejected', 'all'];
  readonly statusLabels: { [status: string]: string } = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    all: 'All',
  };

  @ViewChild('confirmRemoveModal') confirmRemoveModal: ModalDirective;
  removeComment: Comment | undefined;
  isRemovingComment$ = new BehaviorSubject<boolean>(false);

  @ViewChild('confirmRejectModal') confirmRejectModal: ModalDirective;
  rejectComment: Comment | undefined;
  isSavingComment$ = new BehaviorSubject<boolean>(false);

  identifyBy = identifyBy;

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

    // Get initial router params before anything reads them
    this.route.queryParams.first().subscribe((queryParams: Params) => {
      this.query$.next(queryParams.query || '');
      this.status$.next(this.parseStatusFilter(queryParams.status));
    });

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
        ([groupId, query, status, page, limit, _]: FilterInputs) =>
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

    // Catch inside the switchMap - an error reaching the outer stream would
    // unsubscribe it, leaving the list stuck until the tab is reopened
    this.commentsSubscription = this.filterParams$
      .switchMap((searchParams: SearchParams) =>
        this.commentService.find(searchParams).catch(() => {
          this.alertify.error(`Failed loading ${this.env.storiesLabel}`);
          return Observable.of<Comment[]>([]);
        })
      )
      .subscribe((comments: Comment[]) => (this.state.controlPanel.comments = comments));
    this.numberOfComments$ = this.filterParams$.switchMap((searchParams: SearchParams) =>
      this.commentService.count(searchParams).catch(() => Observable.of(0))
    );
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
          this.commentService.countPending(this.groupId$.getValue());
          this.alertify.success(`Approved ${this.env.storyLabel}`);
        },
        () => {
          this.alertify.error(`Failed approving ${this.env.storyLabel}`);
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
          this.commentService.countPending(this.groupId$.getValue());
          this.alertify.success(`Rejected ${this.env.storyLabel}`);
          this.confirmRejectModal.hide();
        },
        () => {
          this.alertify.error(`Failed rejecting ${this.env.storyLabel}`);
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
          this.commentService.countPending(this.groupId$.getValue());
          this.alertify.success(`Deleted comment`);
          this.confirmRemoveModal.hide();
        },
        () => {
          this.alertify.error(`Failed deleting comment`);
        }
      );
  }

  // LIOW doesn't require approval, so its tab keeps listing published
  // testimonies rather than opening on an empty queue
  private get defaultStatusFilter(): StatusFilter {
    return this.env.appId === 'liow' ? 'approved' : 'pending';
  }

  private parseStatusFilter(value: string): StatusFilter {
    return this.statusFilters.indexOf(<StatusFilter>value) === -1
      ? this.defaultStatusFilter
      : <StatusFilter>value;
  }

  /**
   * Map a filter to the `status` query param
   *
   * Approved is left as the server's default view - naming it would exclude
   * comments predating the status field, which have no status at all. All has
   * to name it, so it misses those comments until they are backfilled.
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
