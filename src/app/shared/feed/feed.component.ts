import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { assign, first, has, last } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';

import { FeedCriteria, FeedItem } from '../../core/models';
import { FeedService } from '../../core/services/feed.service';
import { StateService } from '../../core/services/state.service';
import { identifyBy } from '../utils';

@Component({
  selector: 'liow-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnChanges, OnInit, OnDestroy {
  @Input() criteria: FeedCriteria;

  isLoading$ = new BehaviorSubject<boolean>(false);

  identifyBy = identifyBy;

  private updateSubscription: Subscription;

  constructor(
    private feedService: FeedService,
    public state: StateService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (has(changes, 'criteria.currentValue') && changes['criteria'].currentValue) {
      this.isLoading$.next(true);
      this.feedService.load(this.criteria)
        .finally(() => this.isLoading$.next(false))
        .subscribe((feedItems: FeedItem[]) => this.state.feed.items = feedItems);
    }
  }

  ngOnInit(): void {
    this.updateSubscription = this.state.feed.update$
      .skip(1)
      .subscribe((reload: boolean) => this.loadNewerItems());
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

  loadNewerItems(): void {
    this.isLoading$.next(true);
    this.state.feed.items$
      .first()
      .switchMap((feedItems: FeedItem[]) => {
        const newestFeedItem = first(feedItems);
        const criteria = newestFeedItem
          ? assign({}, this.criteria, { after: newestFeedItem._id })
          : this.criteria
          ;

        return this.feedService.load(criteria)
          .map((moreFeedItems: FeedItem[]) => this.state.feed.items = [...moreFeedItems, ...feedItems]);
      })
      .finally(() => this.isLoading$.next(false))
      .subscribe();
  }

  loadOlderItems(): void {
    this.isLoading$.next(true);
    this.state.feed.items$
      .first()
      .debounceTime(300)
      .switchMap((feedItems: FeedItem[]) => {
        const oldestFeedItem = last(feedItems);
        const criteria = oldestFeedItem
          ? assign({}, this.criteria, { before: oldestFeedItem._id })
          : this.criteria
          ;

        return this.feedService.load(criteria)
          .map((moreFeedItems: FeedItem[]) => this.state.feed.items = [...feedItems, ...moreFeedItems]);
      })
      .finally(() => this.isLoading$.next(false))
      .subscribe();
  }
}
