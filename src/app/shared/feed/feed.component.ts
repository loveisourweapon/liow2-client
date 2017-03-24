import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { has } from 'lodash';

import { FeedCriteria, FeedItem } from '../../store/feed';
import { User } from '../../store/user';
import * as feed from '../../store/feed/feed.actions';
import * as fromRoot from '../../store/reducer';

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
      this.store.dispatch(new feed.LoadInitialAction(this.criteria));
    }
  }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.feedItems$ = this.store.select(fromRoot.getFeedItems);
    this.isLoading$ = this.store.select(fromRoot.getFeedIsLoading);
  }

  loadNewerItems(): void {
    this.store.dispatch(new feed.LoadNewerAction());
  }

  loadOlderItems(): void {
    this.store.dispatch(new feed.LoadOlderAction());
  }

  identifyFeedItem(idx: number, feedItem: FeedItem): string {
    return feedItem._id;
  }
}
