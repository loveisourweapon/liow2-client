import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ActEffects, ActService } from './index';
import * as act from './act.actions';
import * as alertify from '../alertify/alertify.actions';
import { Deed } from '../deed';
import { ActStubService, takeAndScan } from '../../../testing';

describe(`ActEffects`, () => {
  let runner: EffectsRunner;
  let actEffects: ActEffects;
  let actService: ActService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          ActEffects,
          { provide: ActService, useClass: ActStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, ActEffects], (_runner, _actEffects) => {
    runner = _runner;
    actEffects = _actEffects;
    actService = TestBed.get(ActService);
  }));

  describe(`done$`, () => {
    const testDeed = <Deed>{ _id: 'abc123' };

    it(`should dispatch 2x COUNT, DONE_SUCCESS and SUCCESS actions after successful done request`, () => {
      spyOn(actService, 'done').and.returnValue(Observable.of({}));
      runner.queue(new act.DoneAction({ deed: testDeed }));
      takeAndScan(actEffects.done$, 4)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(act.ActionTypes.COUNT);
          expect(results[1].type).toBe(act.ActionTypes.COUNT);
          expect(results[2].type).toBe(act.ActionTypes.DONE_SUCCESS);
          expect(results[3].type).toBe(alertify.ActionTypes.SUCCESS);
        });
    });

    it(`should dispatch DONE_FAIL action after failed done request`, () => {
      const errorMessage = 'Test error';
      spyOn(actService, 'done').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new act.DoneAction({ deed: testDeed }));
      takeAndScan(actEffects.done$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(act.ActionTypes.DONE_FAIL);
          expect(results[0].payload).toBe(errorMessage);
          expect(results[1].type).toBe(alertify.ActionTypes.ERROR);
        });
    });
  });
});
