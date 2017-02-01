import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CounterEffects } from './counter';
import { CounterQuery, CounterResult, DeedCounterResult } from '../models';
import * as act from '../actions/act';
import * as deed from '../actions/deed';
import { ActService, DeedService } from '../services';
import { ActStubService, DeedStubService } from '../../../testing';

describe(`CounterEffects`, () => {
  let runner: EffectsRunner;
  let counterEffects: CounterEffects;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          CounterEffects,
          { provide: ActService, useClass: ActStubService },
          { provide: DeedService, useClass: DeedStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, CounterEffects], (_runner, _counterEffects) => {
    runner = _runner;
    counterEffects = _counterEffects;
  }));

  describe(`count$`, () => {
    let actService: ActService;
    beforeEach(() => actService = TestBed.get(ActService));

    it(`should dispatch COUNT_SUCCESS after retrieving counter`, () => {
      const query = <CounterQuery>{};
      const response = <CounterResult>{};
      const countSpy = spyOn(actService, 'count').and.returnValue(Observable.of(response));
      runner.queue(new act.CountAction(query));
      counterEffects.count$.skip(1).subscribe((result: Action) => {
        expect(countSpy).toHaveBeenCalledWith(query);
        expect(result.type).toBe(act.ActionTypes.COUNT_SUCCESS);
        expect(result.payload).toBe(response);
      });
    });

    it(`should dispatch COUNT_FAIL after failing to retrieve counter`, () => {
      const error = {};
      spyOn(actService, 'count').and.returnValue(Observable.throw(error));
      runner.queue(new act.CountAction());
      counterEffects.count$.subscribe((result: Action) => {
        expect(result.type).toBe(act.ActionTypes.COUNT_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`allDeedCounters$`, () => {
    let deedService: DeedService;
    beforeEach(() => deedService = TestBed.get(DeedService));

    it(`should dispatch ALL_COUNTERS_SUCCESS after retrieving deed counters`, () => {
      const response = <DeedCounterResult[]>[];
      const countersSpy = spyOn(deedService, 'countAll').and.returnValue(Observable.of(response));
      runner.queue(new deed.AllCountersAction());
      counterEffects.allDeedCounters$.subscribe((result: Action) => {
        expect(countersSpy).toHaveBeenCalled();
        expect(result.type).toBe(deed.ActionTypes.ALL_COUNTERS_SUCCESS);
        expect(result.payload).toBe(response);
      });
    });

    it(`should dispatch ALL_COUNTERS_FAIL after failing to retrieve deed counters`, () => {
      const error = {};
      spyOn(deedService, 'countAll').and.returnValue(Observable.throw(error));
      runner.queue(new deed.AllCountersAction());
      counterEffects.allDeedCounters$.subscribe((result: Action) => {
        expect(result.type).toBe(deed.ActionTypes.ALL_COUNTERS_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });
});
