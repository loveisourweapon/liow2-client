import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Act, ActEffects, ActService } from './index';
import * as act from './act.actions';
import { Deed } from '../deed';
import { ActStubService } from '../../../testing';

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

    it(`should dispatch 2x COUNT and DONE_SUCCESS actions after successful done request`, () => {
      const response = new Response(new ResponseOptions({ body: <Act>{} }));
      spyOn(actService, 'done').and.returnValue(Observable.of(response));
      runner.queue(new act.DoneAction({ deed: testDeed }));
      actEffects.done$
        .take(3)
        .scan((results: Action[], result: Action) => [...results, result], [])
        .skip(2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(act.ActionTypes.COUNT);
          expect(results[1].type).toBe(act.ActionTypes.COUNT);
          expect(results[2].type).toBe(act.ActionTypes.DONE_SUCCESS);
        });
    });

    it(`should dispatch DONE_FAIL action after failed done request`, () => {
      const errorMessage = 'Test error';
      spyOn(actService, 'done').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new act.DoneAction({ deed: testDeed }));
      actEffects.done$.subscribe((result: Action) => {
        expect(result.type).toBe(act.ActionTypes.DONE_FAIL);
        expect(result.payload).toBe(errorMessage);
      });
    });
  });
});
