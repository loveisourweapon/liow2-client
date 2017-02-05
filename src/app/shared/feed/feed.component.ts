import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { has } from 'lodash';

import { FeedCriteria, FeedItem, User } from '../../store/models';
import * as feed from '../../store/actions/feed';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'liow-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnChanges, OnInit {
  @Input() criteria: FeedCriteria;

  authUser$: Observable<User>;
  feedItems$: Observable<FeedItem[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (has(changes, 'criteria.currentValue') && changes['criteria'].currentValue) {
      this.store.dispatch(new feed.LoadAction(this.criteria));
    }
  }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.feedItems$ = this.store.select(fromRoot.getFeedItems);
    this.isLoading$ = this.store.select(fromRoot.getFeedIsLoading);
  }

  loadNewerItems(): void {
    this.feedItems$
      .take(1)
      .map((feedItems: FeedItem[]) => feedItems[0])
      .subscribe((newestFeedItem: FeedItem) => {
        if (!newestFeedItem) { return; }

        const newerCriteria = Object.assign({}, this.criteria, {
          after: newestFeedItem._id,
        });

        this.store.dispatch(new feed.LoadAction(newerCriteria));
      });
  }

  loadOlderItems(): void {
    this.feedItems$
      .take(1)
      .map((feedItems: FeedItem[]) => feedItems[feedItems.length - 1])
      .subscribe((oldestFeedItem: FeedItem) => {
        if (!oldestFeedItem) { return; }

        const olderCriteria = Object.assign({}, this.criteria, {
          before: oldestFeedItem._id,
        });

        this.store.dispatch(new feed.LoadAction(olderCriteria));
      });
  }
}
