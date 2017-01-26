import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DeedEffects } from './deed';
import * as deed from '../actions/deed';
import { DeedService } from '../services';
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

  it(`should trigger FIND_SUCCESS after FIND action and successful http request`, () => {
    const payload = [];
    spyOn(deedService, 'find').and.returnValue(Observable.of(payload));
    runner.queue(new deed.FindAction());
    deedEffects.find$.subscribe((result: Action) => {
      expect(result.type).toBe(deed.ActionTypes.FIND_SUCCESS);
      expect(result.payload).toBe(payload);
    });
  });

  it(`should trigger FIND_FAIL after FIND action and failed http request`, () => {
    const error = {};
    spyOn(deedService, 'find').and.returnValue(Observable.throw(error));
    runner.queue(new deed.FindAction());
    deedEffects.find$.subscribe((result: Action) => {
      expect(result.type).toBe(deed.ActionTypes.FIND_FAIL);
      expect(result.payload).toBe(error);
    });
  });
});
