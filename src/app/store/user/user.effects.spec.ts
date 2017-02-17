import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User, UserEffects, UserService } from './index';
import * as user from './user.actions';
import * as act from '../act/act.actions';
import { UserStubService, takeAndScan } from '../../../testing';

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

  describe(`getAndSetCurrent$`, () => {
    it(`should dispatch SET_CURRENT and COUNT after getting user`, () => {
      const userId = 'abc123';
      const foundUser = <User>{ _id: userId };
      const getSpy = spyOn(userService, 'get').and.returnValue(Observable.of(foundUser));
      runner.queue(new user.GetAndSetCurrentAction(userId));
      takeAndScan(userEffects.getAndSetCurrent$, 2)
        .subscribe((results: Action[]) => {
          expect(getSpy).toHaveBeenCalledWith(userId);
          expect(results[0].type).toBe(user.ActionTypes.SET_CURRENT);
          expect(results[0].payload).toBe(foundUser);
          expect(results[1].type).toBe(act.ActionTypes.COUNT);
          expect(results[1].payload).toEqual({ user: userId });
        });
    });

    it(`should dispatch GET_FAIL after failing to get user`, () => {
      const userId = 'abc123';
      const error = new Error('Test error');
      const getSpy = spyOn(userService, 'get').and.returnValue(Observable.throw(error));
      runner.queue(new user.GetAndSetCurrentAction(userId));
      userEffects.getAndSetCurrent$.subscribe((result: Action) => {
        expect(getSpy).toHaveBeenCalledWith(userId);
        expect(result.type).toBe(user.ActionTypes.GET_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

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
