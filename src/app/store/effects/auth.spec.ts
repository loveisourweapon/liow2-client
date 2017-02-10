import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { pick } from 'lodash';

import { AuthEffects } from './auth';
import * as auth from '../actions/auth';
import { AuthService, UserService } from '../services';
import { AuthStubService, UserStubService } from '../../../testing';

describe(`AuthEffects`, () => {
  let runner: EffectsRunner;
  let authEffects: AuthEffects;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          AuthEffects,
          { provide: AuthService, useClass: AuthStubService },
          { provide: UserService, useClass: UserStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, AuthEffects], (_runner, _deedEffects) => {
    runner = _runner;
    authEffects = _deedEffects;
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
  }));

  describe(`signup$`, () => {
    const newUser = {
      email: 'tester@example.com',
      password: 'testing123',
      firstName: 'Test',
      lastName: 'User',
    };

    it(`should dispatch SIGNUP_SUCCESS and LOGIN_WITH_EMAIL actions after saving new user`, () => {
      const saveSpy = spyOn(userService, 'save').and.returnValue(Observable.of(newUser));
      runner.queue(new auth.SignupAction(newUser));
      authEffects.signup$
        .take(2)
        .scan((results: Action[], result: Action) => [...results, result], [])
        .skip(1)
        .subscribe((results: Action[]) => {
          expect(saveSpy).toHaveBeenCalledWith(newUser);
          expect(results[0].type).toBe(auth.ActionTypes.LOGIN_WITH_EMAIL);
          expect(results[0].payload).toEqual(pick(newUser, ['email', 'password']));
          expect(results[1].type).toBe(auth.ActionTypes.SIGNUP_SUCCESS);
        });
    });

    it(`should dispatch SIGNUP_FAIL action after failing to save user`, () => {
      const errorMessage = 'Test error';
      spyOn(userService, 'save').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new auth.SignupAction(newUser));
      authEffects.signup$.subscribe((result: Action) => {
        expect(result.type).toBe(auth.ActionTypes.SIGNUP_FAIL);
        expect(result.payload).toBe(errorMessage);
      });
    });
  });

  describe(`loginEmail$`, () => {
    const credentials = {
      email: 'tester@example.com',
      password: 'testing123',
    };

    it(`should get the authenticated user then dispatch LOGIN_SUCCESS action on successful authentication`, () => {
      const authSpy = spyOn(authService, 'authenticateEmail').and.returnValue(Observable.of({}));
      const userSpy = spyOn(userService, 'getCurrent').and.returnValue(Observable.of({}));
      runner.queue(new auth.LoginWithEmailAction(credentials));
      authEffects.loginEmail$.subscribe((result: Action) => {
        expect(authSpy).toHaveBeenCalled();
        expect(userSpy).toHaveBeenCalled();
        expect(result.type).toBe(auth.ActionTypes.LOGIN_SUCCESS);
      });
    });

    it(`should dispatch LOGIN_FAIL action on unsuccessful authentication`, () => {
      const errorMessage = 'Test error';
      spyOn(authService, 'authenticateEmail').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new auth.LoginWithEmailAction(credentials));
      authEffects.loginEmail$.subscribe((result: Action) => {
        expect(result.type).toBe(auth.ActionTypes.LOGIN_FAIL);
        expect(result.payload).toBe(errorMessage);
      });
    });
  });

  describe(`loginFacebook$`, () => {
    it(`should get the authenticated user then dispatch LOGIN_SUCCESS action on facebook authentication`, () => {
      const authSpy = spyOn(authService, 'authenticateFacebook').and.returnValue(Observable.of({}));
      const userSpy = spyOn(userService, 'getCurrent').and.returnValue(Observable.of({}));
      runner.queue(new auth.LoginWithFacebookAction());
      authEffects.loginFacebook$.subscribe((result: Action) => {
        expect(authSpy).toHaveBeenCalled();
        expect(userSpy).toHaveBeenCalled();
        expect(result.type).toBe(auth.ActionTypes.LOGIN_SUCCESS);
      });
    });

    it(`should dispatch LOGIN_FAIL action on unsuccessful facebook authentication`, () => {
      const errorMessage = 'Test error';
      spyOn(authService, 'authenticateFacebook').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new auth.LoginWithFacebookAction());
      authEffects.loginEmail$.subscribe((result: Action) => {
        expect(result.type).toBe(auth.ActionTypes.LOGIN_FAIL);
        expect(result.payload).toBe(errorMessage);
      });
    });
  });

  describe(`loginToken$`, () => {
    it(`should get the authenticated user then dispatch LOGIN_SUCCESS action for existing valid token`, () => {
      const authSpy = spyOn(authService, 'isAuthenticated').and.returnValue(true);
      const userSpy = spyOn(userService, 'getCurrent').and.returnValue(Observable.of({}));
      runner.queue(new auth.LoginWithTokenAction());
      authEffects.loginToken$.subscribe((result: Action) => {
        expect(authSpy).toHaveBeenCalled();
        expect(userSpy).toHaveBeenCalled();
        expect(result.type).toBe(auth.ActionTypes.LOGIN_SUCCESS);
      });
    });

    it(`should dispatch LOGIN_FAIL action for non-existent or invalid token`, () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(false);
      runner.queue(new auth.LoginWithTokenAction());
      authEffects.loginToken$.subscribe((result: Action) => {
        expect(result.type).toBe(auth.ActionTypes.LOGIN_FAIL);
        expect(result.payload).toBe('Not authenticated');
      });
    });
  });

  describe(`logout$`, () => {
    it(`should dispatch LOGOUT_SUCCESS action after logging out`, () => {
      const logoutSpy = spyOn(authService, 'logout').and.returnValue(Observable.of(undefined));
      runner.queue(new auth.LogoutAction());
      authEffects.logout$.subscribe((result: Action) => {
        expect(logoutSpy).toHaveBeenCalled();
        expect(result.type).toBe(auth.ActionTypes.LOGOUT_SUCCESS);
      });
    });
  });
});
