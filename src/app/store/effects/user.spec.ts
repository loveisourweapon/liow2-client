import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserEffects } from './user';
import * as user from '../actions/user';
import { UserService } from '../services';
import { UserStubService } from '../../../testing';

describe(`UserEffects`, () => {
  let runner: EffectsRunner;
  let userEffects: UserEffects;
  let userService: UserService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          UserEffects,
          { provide: UserService, useClass: UserStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, UserEffects], (_runner, _userEffects) => {
    runner = _runner;
    userEffects = _userEffects;
    userService = TestBed.get(UserService);
  }));

  describe(`count$`, () => {
    it(`should dispatch COUNT_SUCCESS after counting all users`, () => {
      const counter = 0;
      const countSpy = spyOn(userService, 'count').and.returnValue(Observable.of(counter));
      runner.queue(new user.CountAction());
      userEffects.count$.subscribe((result: Action) => {
        expect(countSpy).toHaveBeenCalled();
        expect(result.type).toBe(user.ActionTypes.COUNT_SUCCESS);
        expect(result.payload).toBe(counter);
      });
    });

    it(`should dispatch COUNT_FAIL after failing to count all users`, () => {
      const error = {};
      spyOn(userService, 'count').and.returnValue(Observable.throw(error));
      runner.queue(new user.CountAction());
      userEffects.count$.subscribe((result: Action) => {
        expect(result.type).toBe(user.ActionTypes.COUNT_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });
});
