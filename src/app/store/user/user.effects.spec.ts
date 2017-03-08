import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User, UserEffects, UserService } from './index';
import * as user from './user.actions';
import * as act from '../act/act.actions';
import * as alertify from '../alertify/alertify.actions';
import * as auth from '../auth/auth.actions';
import { Group } from '../group';
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

  describe(`joinGroup$`, () => {
    const testUser = <User>{ _id: 'abc123', groups: [] };
    const testGroup = <Group>{ _id: 'def456' };

    it(`should generate a properly formed JsonPatch object`, () => {
      const updateSpy = spyOn(userService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new user.JoinGroupAction({ user: testUser, group: testGroup }));
      userEffects.joinGroup$.take(1).subscribe(() => {
        const patch = updateSpy.calls.mostRecent().args[1][0];
        expect(patch.op).toBe('add');
        expect(patch.path).toBe(`/groups/${testUser.groups.length}`);
        expect(patch.value).toBe(testGroup._id);
      });
    });

    it(`should dispatch LOGIN_WITH_TOKEN, SET_CURRENT_GROUP and alertify SUCCESS actions after updating user`, () => {
      spyOn(userService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new user.JoinGroupAction({ user: testUser, group: testGroup }));
      takeAndScan(userEffects.joinGroup$, 3)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(auth.ActionTypes.LOGIN_WITH_TOKEN);
          expect(results[1].type).toBe(auth.ActionTypes.SET_CURRENT_GROUP);
          expect(results[1].payload).toBe(testGroup);
          expect(results[2].type).toBe(alertify.ActionTypes.SUCCESS);
          expect(results[2].payload).toMatch(/^Joined group/);
        });
    });

    it(`should dispatch alertify ERROR action after failing to update user`, () => {
      spyOn(userService, 'update').and.returnValue(Observable.throw({}));
      runner.queue(new user.JoinGroupAction({ user: testUser, group: testGroup }));
      userEffects.joinGroup$.subscribe((result: Action) => {
        expect(result.type).toBe(alertify.ActionTypes.ERROR);
        expect(result.payload).toMatch(/^Failed joining group/);
      });
    });
  });

  describe(`leaveGroup$`, () => {
    const testGroup = <Group>{ _id: 'def456' };
    const testUser = <User>{ _id: 'abc123', groups: [testGroup] };

    it(`should generate a properly formed JsonPatch object`, () => {
      const updateSpy = spyOn(userService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new user.LeaveGroupAction({ user: testUser, group: testGroup }));
      userEffects.leaveGroup$.take(1).subscribe(() => {
        const patch = updateSpy.calls.mostRecent().args[1][0];
        expect(patch.op).toBe('remove');
        expect(patch.path).toBe(`/groups/0`);
      });
    });

    it(`should dispatch LOGIN_WITH_TOKEN and alertify LOG actions after updating user`, () => {
      spyOn(userService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new user.LeaveGroupAction({ user: testUser, group: testGroup }));
      takeAndScan(userEffects.leaveGroup$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(auth.ActionTypes.LOGIN_WITH_TOKEN);
          expect(results[1].type).toBe(alertify.ActionTypes.LOG);
          expect(results[1].payload).toMatch(/^Left group/);
        });
    });

    it(`should dispatch alertify ERROR action after failing to update user`, () => {
      spyOn(userService, 'update').and.returnValue(Observable.throw({}));
      runner.queue(new user.LeaveGroupAction({ user: testUser, group: testGroup }));
      userEffects.leaveGroup$.subscribe((result: Action) => {
        expect(result.type).toBe(alertify.ActionTypes.ERROR);
        expect(result.payload).toMatch(/^Failed leaving group/);
      });
    });
  });
});
