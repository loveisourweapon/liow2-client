import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { assign, first, last } from 'lodash';

import { FeedCriteria, FeedItem } from './index';
import { FeedService } from './feed.service';
import * as alertify from '../alertify/alertify.actions';
import * as feed from './feed.actions';
import * as fromRoot from '../reducer';

@Injectable()
export class FeedEffects {
  @Effect()
  loadInitial$: Observable<Action> = this.actions$
    .ofType(feed.ActionTypes.LOAD_INITIAL).map(toPayload)
    .flatMap((feedCriteria: FeedCriteria) => this.feedService.load(feedCriteria)
      .map((feedItems: FeedItem[]) => new feed.LoadInitialSuccessAction(feedItems))
      .catch(this.handleError));

  @Effect()
  loadNewer$: Observable<Action> = this.actions$
    .ofType(feed.ActionTypes.LOAD_NEWER)
    .debounceTime(200)
    .flatMap(() => Observable.combineLatest(
      this.criteria$.take(1),
      this.feedItems$.take(1).map((feedItems: FeedItem[]) => first(feedItems)),
    ))
    .map(([criteria, newestFeedItem]: [FeedCriteria, FeedItem]) => {
      return newestFeedItem
        ? assign({}, criteria, { after: newestFeedItem._id })
        : criteria
        ;
    })
    .flatMap((feedCriteria: FeedCriteria) => this.feedService.load(feedCriteria)
      .map((feedItems: FeedItem[]) => new feed.LoadNewerSuccessAction(feedItems))
      .catch(this.handleError));

  @Effect()
  loadOlder$: Observable<Action> = this.actions$
    .ofType(feed.ActionTypes.LOAD_OLDER).map(toPayload)
    .debounceTime(200)
    .flatMap(() => Observable.combineLatest(
      this.criteria$.take(1),
      this.feedItems$.take(1).map((feedItems: FeedItem[]) => last(feedItems)),
    ))
    .map(([criteria, oldestFeedItem]: [FeedCriteria, FeedItem]) => {
      return oldestFeedItem
        ? assign({}, criteria, { before: oldestFeedItem._id })
        : criteria
        ;
    })
    .flatMap((feedCriteria: FeedCriteria) => this.feedService.load(feedCriteria)
      .map((feedItems: FeedItem[]) => new feed.LoadOlderSuccessAction(feedItems))
      .catch(this.handleError));

  private criteria$: Observable<FeedCriteria>;
  private feedItems$: Observable<FeedItem[]>;

  constructor(
    private actions$: Actions,
    private feedService: FeedService,
    private store: Store<fromRoot.State>,
  ) {
    this.criteria$ = this.store.select(fromRoot.getCriteria);
    this.feedItems$ = this.store.select(fromRoot.getFeedItems);
  }

  private handleError() {
    return Observable.from([
      new feed.LoadFailAction(),
      new alertify.ErrorAction(`Failed loading feed items`),
    ]);
  }
}
