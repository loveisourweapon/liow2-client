import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { has } from 'lodash';

import { FeedService } from '../services';
import { FeedItem } from '../models';
import * as feed from '../actions/feed';

@Injectable()
export class FeedEffects {
  @Effect()
  loadInitial$: Observable<Action> = this.actions$
    .ofType(feed.ActionTypes.LOAD)
    .filter((action: Action) => !(has(action.payload, 'after') || has(action.payload, 'before')))
    .flatMap((action: Action) => this.feedService.load(action.payload))
    .map((feedItems: FeedItem[]) => new feed.LoadInitialSuccessAction(feedItems))
    .catch(error => Observable.of(new feed.LoadFailAction(error)));

  @Effect()
  loadNewer$: Observable<Action> = this.actions$
    .ofType(feed.ActionTypes.LOAD)
    .filter((action: Action) => has(action.payload, 'after'))
    .flatMap((action: Action) => this.feedService.load(action.payload))
    .map((feedItems: FeedItem[]) => new feed.LoadNewerSuccessAction(feedItems))
    .catch(error => Observable.of(new feed.LoadFailAction(error)));

  @Effect()
  loadOlder$: Observable<Action> = this.actions$
    .ofType(feed.ActionTypes.LOAD)
    .filter((action: Action) => has(action.payload, 'before'))
    .flatMap((action: Action) => this.feedService.load(action.payload))
    .map((feedItems: FeedItem[]) => new feed.LoadOlderSuccessAction(feedItems))
    .catch(error => Observable.of(new feed.LoadFailAction(error)));

  constructor(
    private actions$: Actions,
    private feedService: FeedService,
  ) { }
}
