import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { UserControlPanelEffects } from './index';
import { User } from '../../user';
import * as userControlPanel from './user.actions';
import * as act from '../../act/act.actions';

describe(`UserControlPanelEffects`, () => {
  let runner: EffectsRunner;
  let userControlPanelEffects: UserControlPanelEffects;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          UserControlPanelEffects,
        ],
      });
  });

  beforeEach(inject([EffectsRunner, UserControlPanelEffects], (_runner, _userControlPanelEffects) => {
    runner = _runner;
    userControlPanelEffects = _userControlPanelEffects;
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
});
