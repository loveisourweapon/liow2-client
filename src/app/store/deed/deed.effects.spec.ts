import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Deed, DeedEffects, DeedService } from './index';
import * as deed from './deed.actions';
import { DeedStubService } from '../../../testing';

describe(`DeedEffects`, () => {
  let runner: EffectsRunner;
  let deedEffects: DeedEffects;
  let deedService: DeedService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          DeedEffects,
          { provide: DeedService, useClass: DeedStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, DeedEffects], (_runner, _deedEffects) => {
    runner = _runner;
    deedEffects = _deedEffects;
    deedService = TestBed.get(DeedService);
  }));

  describe(`find$`, () => {
    it(`should dispatch FIND_ALL_SUCCESS after successful find HTTP request`, () => {
      const payload = [];
      spyOn(deedService, 'find').and.returnValue(Observable.of(payload));
      runner.queue(new deed.FindAllAction());
      deedEffects.findAll$.subscribe((result: Action) => {
        expect(result.type).toBe(deed.ActionTypes.FIND_ALL_SUCCESS);
        expect(result.payload).toBe(payload);
      });
    });

    it(`should dispatch FIND_ALL_FAIL after failed find HTTP request`, () => {
      const errorMessage = 'Test error';
      spyOn(deedService, 'find').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new deed.FindAllAction());
      deedEffects.findAll$.subscribe((result: Action) => {
        expect(result.type).toBe(deed.ActionTypes.FIND_ALL_FAIL);
        expect(result.payload).toBe(errorMessage);
      });
    });
  });

  describe(`findAndSetCurrent$`, () => {
    it(`should dispatch SET_CURRENT after finding current deed`, () => {
      const foundDeed = <Deed>{};
      spyOn(deedService, 'findOne').and.returnValue(Observable.of(foundDeed));
      runner.queue(new deed.FindAndSetCurrentAction({}));
      deedEffects.findAndSetCurrent$.subscribe((result: Action) => {
        expect(result.type).toBe(deed.ActionTypes.SET_CURRENT);
        expect(result.payload).toBe(foundDeed);
      });
    });

    it(`should dispatch FIND_AND_SET_CURRENT_FAIL after failing to find current deed`, () => {
      const errorMessage = 'Test error';
      spyOn(deedService, 'findOne').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new deed.FindAndSetCurrentAction({}));
      deedEffects.findAndSetCurrent$.subscribe((result: Action) => {
        expect(result.type).toBe(deed.ActionTypes.FIND_AND_SET_CURRENT_FAIL);
        expect(result.payload).toBe(errorMessage);
      });
    });
  });
});
