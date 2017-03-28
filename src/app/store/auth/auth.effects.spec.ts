import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { routerActions } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { pick } from 'lodash';

import { AuthEffects, AuthService } from './index';
import * as auth from './auth.actions';
import * as alertify from '../alertify/alertify.actions';
import { Group } from '../group';
import * as group from '../group/group.actions';
import * as loginModal from '../modal/login/login.actions';
import { User, UserService } from '../user';
import { State as AppState } from '../reducer';
import { AuthStubService, StoreStubService, UserStubService, takeAndScan } from '../../../testing';

describe(`AuthEffects`, () => {
  let runner: EffectsRunner;
  let authEffects: AuthEffects;
  let authService: AuthService;
  let store: Store<AppState>;
  let userService: UserService;

  const storeSelect$ = new BehaviorSubject<any>(null);

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          AuthEffects,
          { provide: AuthService, useClass: AuthStubService },
          { provide: Store, useClass: StoreStubService },
          { provide: UserService, useClass: UserStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, AuthEffects], (_runner, _deedEffects) => {
    runner = _runner;
    authEffects = _deedEffects;
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(storeSelect$);
  }));

  describe(`changePassword$`, () => {
    const testUser = <User>{ _id: 'abc123' };
    const currentPassword = 'currentPassword123';
    const newPassword = 'newPassword123';

    it(`should generate properly formed JsonPatch objects`, () => {
      const updateSpy = spyOn(userService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new auth.ChangePasswordAction({ user: testUser, currentPassword, newPassword }));
      authEffects.changePassword$.take(1).subscribe(() => {
        const patches = updateSpy.calls.mostRecent().args[1];
        expect(patches[0].op).toBe('add');
        expect(patches[0].path).toBe(`/currentPassword`);
        expect(patches[0].value).toBe(currentPassword);
        expect(patches[1].op).toBe('add');
        expect(patches[1].path).toBe(`/newPassword`);
        expect(patches[1].value).toBe(newPassword);
      });
    });

    it(`should dispatch CHANGE_PASSWORD_SUCCESS and alertify SUCCESS actions after updating user`, () => {
      spyOn(userService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new auth.ChangePasswordAction({ user: testUser, currentPassword, newPassword }));
      takeAndScan(authEffects.changePassword$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(auth.ActionTypes.CHANGE_PASSWORD_SUCCESS);
          expect(results[1].type).toBe(alertify.ActionTypes.SUCCESS);
          expect(results[1].payload).toMatch(`Password changed`);
        });
    });

    it(`should dispatch CHANGE_PASSWORD_FAIL action after failing to update user`, () => {
      const error = { message: 'Test error' };
      const response = new Response(new ResponseOptions({ body: error }));
      spyOn(userService, 'update').and.returnValue(Observable.throw(response));
      runner.queue(new auth.ChangePasswordAction({ user: testUser, currentPassword, newPassword }));
      authEffects.changePassword$.subscribe((result: Action) => {
        expect(result.type).toBe(auth.ActionTypes.CHANGE_PASSWORD_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`confirmEmail$`, () => {
    const token = 'abc123';

    it(`should dispatch CONFIRM_EMAIL_SUCCESS and navigate after successful email confirmation`, () => {
      const authSpy = spyOn(authService, 'confirmEmail').and.returnValue(Observable.of({}));
      runner.queue(new auth.ConfirmEmailAction(token));
      takeAndScan(authEffects.confirmEmail$, 2)
        .subscribe((results: Action[]) => {
          expect(authSpy.calls.mostRecent().args[0]).toBe(token);
          expect(results[0].type).toBe(alertify.ActionTypes.SUCCESS);
          expect(results[1].type).toBe(routerActions.GO);
        });
    });

    it(`should dispatch CONFIRM_EMAIL_FAIL and navigate after failed email confirmation`, () => {
      const errorMessage = 'Test error';
      const authSpy = spyOn(authService, 'confirmEmail').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new auth.ConfirmEmailAction(token));
      takeAndScan(authEffects.confirmEmail$, 2)
        .subscribe((results: Action[]) => {
          expect(authSpy.calls.mostRecent().args[0]).toBe(token);
          expect(results[0].type).toBe(alertify.ActionTypes.ERROR);
          expect(results[1].type).toBe(routerActions.GO);
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
      takeAndScan(authEffects.loginEmail$, 2)
        .subscribe((results: Action[]) => {
          expect(authSpy).toHaveBeenCalled();
          expect(userSpy).toHaveBeenCalled();
          expect(results[0].type).toBe(auth.ActionTypes.LOGIN_SUCCESS);
          expect(results[1].type).toBe(alertify.ActionTypes.SUCCESS);
        });
    });

    it(`should dispatch LOGIN_FAIL action on unsuccessful authentication`, () => {
      const errorMessage = 'Test error';
      spyOn(authService, 'authenticateEmail').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new auth.LoginWithEmailAction(credentials));
      takeAndScan(authEffects.loginEmail$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(auth.ActionTypes.LOGIN_FAIL);
          expect(results[0].payload).toBe(errorMessage);
          expect(results[1].type).toBe(alertify.ActionTypes.ERROR);
        });
    });
  });

  describe(`loginFacebook$`, () => {
    it(`should get the authenticated user then dispatch LOGIN_SUCCESS action on facebook authentication`, () => {
      const authSpy = spyOn(authService, 'authenticateFacebook').and.returnValue(Observable.of({}));
      const userSpy = spyOn(userService, 'getCurrent').and.returnValue(Observable.of({}));
      runner.queue(new auth.LoginWithFacebookAction());
      takeAndScan(authEffects.loginFacebook$, 2)
        .subscribe((results: Action[]) => {
          expect(authSpy).toHaveBeenCalled();
          expect(userSpy).toHaveBeenCalled();
          expect(results[0].type).toBe(auth.ActionTypes.LOGIN_SUCCESS);
          expect(results[1].type).toBe(alertify.ActionTypes.SUCCESS);
        });
    });

    it(`should dispatch LOGIN_FAIL action on unsuccessful facebook authentication`, () => {
      const errorMessage = 'Test error';
      spyOn(authService, 'authenticateFacebook').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new auth.LoginWithFacebookAction());
      takeAndScan(authEffects.loginEmail$, 2)
      .subscribe((results: Action[]) => {
        expect(results[0].type).toBe(auth.ActionTypes.LOGIN_FAIL);
        expect(results[0].payload).toBe(errorMessage);
        expect(results[1].type).toBe(alertify.ActionTypes.ERROR);
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
      takeAndScan(authEffects.logout$, 2)
        .subscribe((results: Action[]) => {
          expect(logoutSpy).toHaveBeenCalled();
          expect(results[0].type).toBe(auth.ActionTypes.LOGOUT_SUCCESS);
          expect(results[1].type).toBe(alertify.ActionTypes.LOG);
        });
    });
  });

  describe(`resetPassword$`, () => {
    const password = 'Password123';
    const token = 'abc123';

    it(`should dispatch RESET_PASSWORD_DONE, login modal OPEN and alertify SUCCESS actions`, () => {
      const resetSpy = spyOn(authService, 'resetPassword').and.returnValue(Observable.of({}));
      runner.queue(new auth.ResetPasswordAction({ password, token }));
      takeAndScan(authEffects.resetPassword$, 4)
        .subscribe((results: Action[]) => {
          expect(resetSpy).toHaveBeenCalledWith(password, token);
          expect(results[0].type).toBe(auth.ActionTypes.RESET_PASSWORD_DONE);
          expect(results[1].type).toBe(loginModal.ActionTypes.OPEN);
          expect(results[2].type).toBe(alertify.ActionTypes.SUCCESS);
          expect(results[3].type).toBe(routerActions.GO);
        });
    });

    it(`should dispatch RESET_PASSWORD_DONE and alertify ERROR actions after failed resetting password`, () => {
      spyOn(authService, 'resetPassword').and.returnValue(Observable.throw({}));
      runner.queue(new auth.ResetPasswordAction({ password, token }));
      takeAndScan(authEffects.resetPassword$, 3)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(auth.ActionTypes.RESET_PASSWORD_DONE);
          expect(results[1].type).toBe(alertify.ActionTypes.ERROR);
          expect(results[2].type).toBe(routerActions.GO);
        });
    });
  });

  describe(`sendConfirmEmail$`, () => {
    const testEmail = 'test@example.com';

    it(`should dispatch SEND_CONFIRM_EMAIL_DONE and alertify SUCCESS actions after sending email`, () => {
      const confirmSpy = spyOn(authService, 'sendConfirmEmail').and.returnValue(Observable.of({}));
      runner.queue(new auth.SendConfirmEmailAction(testEmail));
      takeAndScan(authEffects.sendConfirmEmail$, 2)
        .subscribe((results: Action[]) => {
          expect(confirmSpy).toHaveBeenCalledWith(testEmail);
          expect(results[0].type).toBe(auth.ActionTypes.SEND_CONFIRM_EMAIL_DONE);
          expect(results[1].type).toBe(alertify.ActionTypes.SUCCESS);
        });
    });

    it(`should dispatch SEND_CONFIRM_EMAIL_DONE and alertify ERROR actions after failed sending email`, () => {
      spyOn(authService, 'sendConfirmEmail').and.returnValue(Observable.throw({}));
      runner.queue(new auth.SendConfirmEmailAction(testEmail));
      takeAndScan(authEffects.sendConfirmEmail$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(auth.ActionTypes.SEND_CONFIRM_EMAIL_DONE);
          expect(results[1].type).toBe(alertify.ActionTypes.ERROR);
        });
    });
  });

  describe(`sendForgotPassword$`, () => {
    const testEmail = 'test@example.com';

    it(`should dispatch SEND_FORGOT_PASSWORD_SUCCESS and alertify SUCCESS actions after sending email`, () => {
      const forgotSpy = spyOn(authService, 'sendForgotPassword').and.returnValue(Observable.of({}));
      runner.queue(new auth.SendForgotPasswordAction(testEmail));
      takeAndScan(authEffects.sendForgotPassword$, 2)
        .subscribe((results: Action[]) => {
          expect(forgotSpy).toHaveBeenCalledWith(testEmail);
          expect(results[0].type).toBe(auth.ActionTypes.SEND_FORGOT_PASSWORD_SUCCESS);
          expect(results[1].type).toBe(alertify.ActionTypes.SUCCESS);
        });
    });

    it(`should dispatch SEND_FORGOT_PASSWORD_FAIL and alertify ERROR actions after failed sending email`, () => {
      spyOn(authService, 'sendForgotPassword').and.returnValue(Observable.throw({}));
      runner.queue(new auth.SendForgotPasswordAction(testEmail));
      takeAndScan(authEffects.sendForgotPassword$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(auth.ActionTypes.SEND_FORGOT_PASSWORD_FAIL);
          expect(results[1].type).toBe(alertify.ActionTypes.ERROR);
        });
    });
  });

  describe(`setCurrentGroup$`, () => {
    const testGroup = <Group>{ _id: 'abc123' };
    const testUser = <User>{ _id: 'def456', groups: [testGroup] };

    afterEach(() => storeSelect$.next(null));

    it(`should dispatch SET_CURRENT_GROUP action if user is a member of group`, () => {
      storeSelect$.next(testUser);
      runner.queue(new group.SetCurrentAction(testGroup));
      authEffects.setCurrentGroup$.subscribe((result: Action) => {
        expect(result.type).toBe(auth.ActionTypes.SET_CURRENT_GROUP);
        expect(result.payload).toBe(testGroup);
      });
    });
  });

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
      takeAndScan(authEffects.signup$, 2)
        .subscribe((results: Action[]) => {
          expect(saveSpy).toHaveBeenCalledWith(newUser);
          expect(results[0].type).toBe(auth.ActionTypes.LOGIN_WITH_EMAIL);
          expect(results[0].payload).toEqual(pick(newUser, ['email', 'password']));
          expect(results[1].type).toBe(auth.ActionTypes.SIGNUP_SUCCESS);
        });
    });

    it(`should dispatch SIGNUP_FAIL action after failing to save user`, () => {
      const error = { errors: {}, message: 'Test error' };
      const response = new Response(new ResponseOptions({ body: { error } }));
      spyOn(userService, 'save').and.returnValue(Observable.throw(response));
      runner.queue(new auth.SignupAction(newUser));
      authEffects.signup$.subscribe((result: Action) => {
        expect(result.type).toBe(auth.ActionTypes.SIGNUP_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });
});
