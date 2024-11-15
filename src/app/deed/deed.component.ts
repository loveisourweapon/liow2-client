import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { has, get } from 'lodash';
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

import { Campaign, CounterQuery, Deed, DeedSlug, FeedCriteria, Group, NewComment } from '../core/models';
import {
  ActService,
  AlertifyService,
  CommentService,
  DeedService,
  ModalService,
  StateService,
  TitleService,
} from '../core/services';

@Component({
  templateUrl: './deed.component.html',
  styleUrls: ['./deed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedComponent implements OnDestroy, OnInit {
  isDoing$ = new BehaviorSubject<boolean>(false);
  isDelaying$ = new BehaviorSubject<number>(0);
  isSavingTestimony$ = new BehaviorSubject<boolean>(false);
  feedCriteria: FeedCriteria;
  testimony = '';

  private routeSubscription: Subscription;
  private deedSubscription: Subscription;

  constructor(
    private actService: ActService,
    private alertify: AlertifyService,
    private commentService: CommentService,
    private deedService: DeedService,
    public modal: ModalService,
    private route: ActivatedRoute,
    public state: StateService,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params
      .filter((params: Params) => has(params, 'deedSlug'))
      .map((params: Params) => params.deedSlug)
      .distinctUntilChanged()
      .do(() => this.state.deed$.next(null))
      .switchMap((deedSlug: DeedSlug) => this.deedService.findOne({ urlTitle: deedSlug }))
      .subscribe((deed: Deed) => this.state.deed = deed);

    this.deedSubscription = Observable.combineLatest(
      this.state.deed$,
      this.state.auth.group$,
      this.state.auth.campaign$,
    )
      .filter(([deed, group, campaign]: [Deed, Group, Campaign]) => deed !== null)
      .subscribe(([deed, group, campaign]: [Deed, Group, Campaign]) => {
        this.loadCounter(deed, group, campaign);
        this.setFeedCriteria(deed, group, campaign);
        this.title.set(deed.title);
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.deedSubscription.unsubscribe();
  }

  onSaveTestimony(content: string, deed$: Observable<Deed>, group$: Observable<Group|null>): void {
    this.isSavingTestimony$.next(true);
    Observable.combineLatest(deed$, group$)
      .first()
      .switchMap(([deed, group]: [Deed, Group]) => {
        const newComment: NewComment = {
          content: { text: content },
          target: { deed: deed._id },
        };
        if (group) { newComment.group = group._id; }

        return this.commentService.save(newComment);
      })
      .finally(() => {
        this.isSavingTestimony$.next(false);
      })
      .subscribe(
        () => {
          this.testimony = '';
          this.state.feed.update();
          this.alertify.success(`Comment saved`);
        },
        async (response) => {
          const error = response.json();
          this.alertify.error(
            get(error, 'error.errors.content.kind') === 'isclean'
              ? `Please keep your language friendly`
              : `Failed saving comment`
          );
        },
      );
  }

  onDeedDone(deed$: Observable<Deed>, group$: Observable<Group|null>, campaign$: Observable<Campaign|null>): void {
    this.isDoing$.next(true);
    Observable.combineLatest(deed$, group$, campaign$)
      .first()
      .switchMap(([deed, group, campaign]: [Deed, Group, Campaign]) => this.actService.done(deed, group)
        .map(() => {
          this.actService.count();
          this.loadCounter(deed, group, campaign);
        }))
      .finally(() => this.isDoing$.next(false))
      .subscribe(
        () => {
          this.state.feed.update(true);
          this.alertify.success(`Deed done!`);

          // Delay the user from doing the deed again for 5 seconds
          this.animateDeedDoneDelay();
        },
        () => this.alertify.error(`Failed registering deed`),
      );
  }

  private animateDeedDoneDelay(): void {
    this.isDelaying$.next(1);
    setTimeout(() => {
      this.isDelaying$.next(2)
      setTimeout(() => {
        this.isDelaying$.next(3)
        setTimeout(() => {
          this.isDelaying$.next(0)
        }, 600);
      }, 600);
    }, 600);
  }

  private loadCounter(deed: Deed, group: Group, campaign: Campaign): void {
    const counterQuery: CounterQuery = { deed: deed._id };
    if (campaign) {
      counterQuery.campaign = campaign._id;
    } else if (group) {
      counterQuery.group = group._id;
    }
    this.actService.count(counterQuery);
  }

  private setFeedCriteria(deed: Deed, group: Group, campaign: Campaign): void {
    this.feedCriteria = { 'target.deed': deed._id };
    if (campaign) {
      this.feedCriteria.campaign = campaign._id;
    } else if (group) {
      this.feedCriteria.group = group._id;
    }
  }
}
