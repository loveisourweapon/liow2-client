import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FeedCriteria, FeedEffects, FeedItem, FeedService } from './index';
import * as alertify from '../alertify/alertify.actions';
import * as feed from './feed.actions';
import { FeedStubService, StoreStubService, takeAndScan } from '../../../testing';

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
          { provide: Store, useClass: StoreStubService },
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

    it(`should dispatch LOAD_INITIAL_SUCCESS action after successful HTTP request`, () => {
      const payload = <FeedItem[]>[];
      spyOn(feedService, 'load').and.returnValue(Observable.of(payload));
      runner.queue(new feed.LoadInitialAction(criteria));
      feedEffects.loadInitial$.subscribe((result: Action) => {
        expect(result.type).toBe(feed.ActionTypes.LOAD_INITIAL_SUCCESS);
        expect(result.payload).toBe(payload);
      });
    });

    it(`should dispatch LOAD_FAIL and alertify ERROR actions after failed HTTP request`, () => {
      spyOn(feedService, 'load').and.returnValue(Observable.throw(new Error()));
      runner.queue(new feed.LoadInitialAction(criteria));
      takeAndScan(feedEffects.loadInitial$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(feed.ActionTypes.LOAD_FAIL);
          expect(results[1].type).toBe(alertify.ActionTypes.ERROR);
        });
    });
  });

  // TODO: need to test these
  describe(`loadNewer$`, () => { });
  describe(`loadOlder$`, () => { });
});
