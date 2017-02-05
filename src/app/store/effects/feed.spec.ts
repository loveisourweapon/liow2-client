import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FeedEffects } from './feed';
import { FeedCriteria, FeedItem } from '../models';
import * as feed from '../actions/feed';
import { FeedService } from '../services';
import { FeedStubService } from '../../../testing';

describe(`FeedEffects`, () => {
  let runner: EffectsRunner;
  let feedEffects: FeedEffects;
  let feedService: FeedService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          FeedEffects,
          { provide: FeedService, useClass: FeedStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, FeedEffects], (_runner, _feedEffects) => {
    runner = _runner;
    feedEffects = _feedEffects;
    feedService = TestBed.get(FeedService);
  }));

  describe(`loadInitial$`, () => {
    const criteria = <FeedCriteria>{};

    it(`should dispatch LOAD_INITIAL_SUCCESS after successful HTTP request`, () => {
      const payload = <FeedItem[]>[];
      spyOn(feedService, 'load').and.returnValue(Observable.of(payload));
      runner.queue(new feed.LoadAction(criteria));
      feedEffects.loadInitial$.subscribe((result: Action) => {
        expect(result.type).toBe(feed.ActionTypes.LOAD_INITIAL_SUCCESS);
        expect(result.payload).toBe(payload);
      });
    });

    it(`should dispatch LOAD_FAIL after failed HTTP request`, () => {
      const error = <Error>{};
      spyOn(feedService, 'load').and.returnValue(Observable.throw(error));
      runner.queue(new feed.LoadAction(criteria));
      feedEffects.loadInitial$.subscribe((result: Action) => {
        expect(result.type).toBe(feed.ActionTypes.LOAD_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`loadNewer$`, () => {
    const criteria = <FeedCriteria>{ after: 'abc123' };

    it(`should dispatch LOAD_NEWER_SUCCESS after successful HTTP request`, () => {
      const payload = <FeedItem[]>[];
      spyOn(feedService, 'load').and.returnValue(Observable.of(payload));
      runner.queue(new feed.LoadAction(criteria));
      feedEffects.loadNewer$.subscribe((result: Action) => {
        expect(result.type).toBe(feed.ActionTypes.LOAD_NEWER_SUCCESS);
        expect(result.payload).toBe(payload);
      });
    });

    it(`should dispatch LOAD_FAIL after failed HTTP request`, () => {
      const error = <Error>{};
      spyOn(feedService, 'load').and.returnValue(Observable.throw(error));
      runner.queue(new feed.LoadAction(criteria));
      feedEffects.loadNewer$.subscribe((result: Action) => {
        expect(result.type).toBe(feed.ActionTypes.LOAD_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`loadOlder$`, () => {
    const criteria = <FeedCriteria>{ before: 'abc123' };

    it(`should dispatch LOAD_OLDER_SUCCESS after successful HTTP request`, () => {
      const payload = <FeedItem[]>[];
      spyOn(feedService, 'load').and.returnValue(Observable.of(payload));
      runner.queue(new feed.LoadAction(criteria));
      feedEffects.loadOlder$.subscribe((result: Action) => {
        expect(result.type).toBe(feed.ActionTypes.LOAD_OLDER_SUCCESS);
        expect(result.payload).toBe(payload);
      });
    });

    it(`should dispatch LOAD_FAIL after failed HTTP request`, () => {
      const error = <Error>{};
      spyOn(feedService, 'load').and.returnValue(Observable.throw(error));
      runner.queue(new feed.LoadAction(criteria));
      feedEffects.loadOlder$.subscribe((result: Action) => {
        expect(result.type).toBe(feed.ActionTypes.LOAD_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });
});
