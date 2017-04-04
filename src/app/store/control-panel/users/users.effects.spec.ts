import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UsersControlPanelEffects } from './index';
import * as usersControlPanel from './users.actions';
import * as fromUsersControlPanel from './users.reducer';
import { State as AppState } from '../../reducer';
import { User, UserService } from '../../user';
import { UserStubService, StoreStubService } from '../../../../testing';

describe(`UsersControlPanelEffects`, () => {
  let runner: EffectsRunner;
  let usersControlPanelEffects: UsersControlPanelEffects;
  let userService: UserService;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          UsersControlPanelEffects,
          { provide: UserService, useClass: UserStubService },
          { provide: Store, useClass: StoreStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, UsersControlPanelEffects], (_runner, _usersControlPanelEffects) => {
    runner = _runner;
    usersControlPanelEffects = _usersControlPanelEffects;
    userService = TestBed.get(UserService);
    store = TestBed.get(Store);
  }));

  describe(`loadUsers$`, () => {
    it(`should generate a SearchParams object`, () => {
      const findSpy = spyOn(userService, 'find').and.returnValue(Observable.of([]));
      spyOn(userService, 'count').and.returnValue(Observable.of(0));
      runner.queue(new usersControlPanel.LoadUsersAction(fromUsersControlPanel.initialState));
      usersControlPanelEffects.loadUsers$.subscribe(() => {
        const searchParams = findSpy.calls.mostRecent().args[0];
        expect(searchParams.query).toBe(fromUsersControlPanel.initialState.query);
        expect(searchParams.limit).toBe(fromUsersControlPanel.initialState.pageSize);
        expect(searchParams.skip).toBe(0);
        expect(searchParams.sort).toBe('-_id');
      });
    });

    it(`should dispatch LOAD_USERS_SUCCESS after finding and counting users`, () => {
      const users = [<User>{}];
      const numberOfUsers = 1;
      spyOn(userService, 'find').and.returnValue(Observable.of(users));
      spyOn(userService, 'count').and.returnValue(Observable.of(numberOfUsers));
      runner.queue(new usersControlPanel.LoadUsersAction(fromUsersControlPanel.initialState));
      usersControlPanelEffects.loadUsers$.subscribe((result: Action) => {
        expect(result.type).toBe(usersControlPanel.ActionTypes.LOAD_USERS_SUCCESS);
        expect(result.payload.users).toBe(users);
        expect(result.payload.numberOfUsers).toBe(numberOfUsers);
      });
    });

    it(`should dispatch LOAD_USERS_FAIL after failing to find users`, () => {
      const error = { message: 'Test error' };
      const response = new Response(new ResponseOptions({ body: error }));
      spyOn(userService, 'find').and.returnValue(Observable.throw(response));
      runner.queue(new usersControlPanel.LoadUsersAction(fromUsersControlPanel.initialState));
      usersControlPanelEffects.loadUsers$.subscribe((result: Action) => {
        expect(result.type).toBe(usersControlPanel.ActionTypes.LOAD_USERS_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`triggerLoadUsers$`, () => {
    beforeEach(() =>
      spyOn(store, 'select').and.returnValue(Observable.of(fromUsersControlPanel.initialState)));

    it(`should dispatch LOAD_USERS with UPDATE_QUERY action`, () => {
      runner.queue(new usersControlPanel.UpdateQueryAction('query'));
      usersControlPanelEffects.triggerLoadUsers$.subscribe((result: Action) => {
        expect(result.type).toBe(usersControlPanel.ActionTypes.LOAD_USERS);
        expect(result.payload).toBe(fromUsersControlPanel.initialState);
      });
    });

    it(`should dispatch LOAD_USERS with UPDATE_PAGE action`, () => {
      runner.queue(new usersControlPanel.UpdatePageAction(2));
      usersControlPanelEffects.triggerLoadUsers$.subscribe((result: Action) => {
        expect(result.type).toBe(usersControlPanel.ActionTypes.LOAD_USERS);
        expect(result.payload).toBe(fromUsersControlPanel.initialState);
      });
    });
  });
});
