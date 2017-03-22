import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserControlPanelEffects } from './index';
import { User, UserService } from '../../user';
import * as userControlPanel from './user.actions';
import * as act from '../../act/act.actions';
import * as alertify from '../../alertify/alertify.actions';
import * as auth from '../../auth/auth.actions';
import { UserStubService, takeAndScan } from '../../../../testing';

describe(`UserControlPanelEffects`, () => {
  let runner: EffectsRunner;
  let userControlPanelEffects: UserControlPanelEffects;
  let userService: UserService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          UserControlPanelEffects,
          { provide: UserService, useClass: UserStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, UserControlPanelEffects], (_runner, _userControlPanelEffects) => {
    runner = _runner;
    userControlPanelEffects = _userControlPanelEffects;
    userService = TestBed.get(UserService);
  }));

  describe(`count$`, () => {
    it(`should dispatch COUNT action when setting user`, () => {
      const userId = 'abc123';
      const currentUser = <User>{ _id: userId };
      runner.queue(new userControlPanel.SetUserAction(currentUser));
      userControlPanelEffects.count$.subscribe((result: Action) => {
        expect(result.type).toBe(act.ActionTypes.COUNT);
        expect(result.payload).toEqual({ user: userId });
      });
    });
  });

  describe(`saveUserName$`, () => {
    const user = <User>{ _id: 'abc123' };
    const firstName = 'Test';
    const lastName = 'User';

    it(`should generate a properly formed JsonPatch object`, () => {
      const updateSpy = spyOn(userService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new userControlPanel.SaveUserNameAction({ user, firstName, lastName }));
      userControlPanelEffects.saveUserName$.take(1).subscribe(() => {
        const patches = updateSpy.calls.mostRecent().args[1];
        expect(patches[0].op).toBe('replace');
        expect(patches[0].path).toBe(`/firstName`);
        expect(patches[0].value).toBe(firstName);
        expect(patches[1].op).toBe('replace');
        expect(patches[1].path).toBe(`/lastName`);
        expect(patches[1].value).toBe(lastName);
      });
    });

    it(`should dispatch SET_IS_EDITING, LOGIN_WITH_TOKEN and alertify SUCCESS actions after updating user`, () => {
      spyOn(userService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new userControlPanel.SaveUserNameAction({ user, firstName, lastName }));
      takeAndScan(userControlPanelEffects.saveUserName$, 3)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(userControlPanel.ActionTypes.SET_IS_EDITING);
          expect(results[0].payload.isEditingName).toBe(false);
          expect(results[1].type).toBe(auth.ActionTypes.LOGIN_WITH_TOKEN);
          expect(results[2].type).toBe(alertify.ActionTypes.SUCCESS);
          expect(results[2].payload).toBe(`Updated name`);
        });
    });

    it(`should dispatch SET_IS_EDITING and alertify ERROR actions after failing to update user`, () => {
      spyOn(userService, 'update').and.returnValue(Observable.throw({}));
      runner.queue(new userControlPanel.SaveUserNameAction({ user, firstName, lastName }));
      takeAndScan(userControlPanelEffects.saveUserName$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(userControlPanel.ActionTypes.SET_IS_EDITING);
          expect(results[0].payload.isEditingName).toBe(false);
          expect(results[1].type).toBe(alertify.ActionTypes.ERROR);
          expect(results[1].payload).toBe(`Failed updating name`);
        });
    });
  });
});
