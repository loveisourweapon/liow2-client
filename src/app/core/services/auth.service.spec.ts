import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { AuthService as Ng2AuthService, JwtHttp } from 'ng2-ui-auth';
import { assign } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import { AlertifyStubService, HttpStubService, Ng2AuthStubService, UserStubService } from '../../../testing';
import { Credentials, Group, User } from '../models';
import { AlertifyService } from './alertify.service';
import { StateService } from './state.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

describe(`AuthService`, () => {
  let service: AuthService;
  let ng2Auth: Ng2AuthService;
  let http: JwtHttp;
  let state: StateService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AlertifyService, useClass: AlertifyStubService },
        { provide: Ng2AuthService, useClass: Ng2AuthStubService },
        { provide: JwtHttp, useClass: HttpStubService },
        StateService,
        { provide: UserService, useClass: UserStubService },
      ],
    });
  });

  beforeEach(inject([AuthService], (_service: AuthService) => {
    service = _service;
    ng2Auth = TestBed.get(Ng2AuthService);
    http = TestBed.get(JwtHttp);
    state = TestBed.get(StateService);
    userService = TestBed.get(UserService);
  }));

  describe(`#authenticateEmail`, () => {
    it(`should throw if email and password not provided`, () => {
      const credentials = <Credentials>{};
      service.authenticateEmail(credentials).subscribe(() => {}, error => {
        expect(error.message).toBe(`Please provide email and password`);
      });
    });

    it(`should pass credentials through to Ng2AuthService.login then load current user`, () => {
      const credentials = <Credentials>{
        email: 'test@example.com',
        password: 'testing123',
      };
      const response = new Response(new ResponseOptions({ body: {} }));
      const authSpy = spyOn(ng2Auth, 'login').and.returnValue(Observable.of(response));
      const userSpy = spyOn(service, 'loadCurrentUser').and.returnValue(Observable.of({}));
      service.authenticateEmail(credentials).subscribe(() => {
        expect(authSpy).toHaveBeenCalledWith(credentials);
        expect(userSpy).toHaveBeenCalled();
        state.auth.isAuthenticated$.first()
          .subscribe((isAuthenticated: boolean) => expect(isAuthenticated).toBe(true));
      });
    });
  });

  describe(`#authenticateFacebook`, () => {
    it(`should call Ng2AuthService.authenticate with 'facebook' param then load current user`, () => {
      const response = new Response(new ResponseOptions({ body: {} }));
      const authSpy = spyOn(ng2Auth, 'authenticate').and.returnValue(Observable.of(response));
      const userSpy = spyOn(service, 'loadCurrentUser').and.returnValue(Observable.of({}));
      service.authenticateFacebook().subscribe(() => {
        expect(authSpy.calls.mostRecent().args[0]).toBe('facebook');
        expect(userSpy).toHaveBeenCalled();
        state.auth.isAuthenticated$.first()
          .subscribe((isAuthenticated: boolean) => expect(isAuthenticated).toBe(true));
      });
    });
  });

  describe(`#loadCurrentUser`, () => {
    const testUser = <User>{ _id: 'abc123' };
    const testGroup = <Group>{ _id: 'def456' };

    it(`should load and return the current user from the user service`, () => {
      const userSpy = spyOn(userService, 'getCurrent').and.returnValue(Observable.of(testUser));
      service.loadCurrentUser().subscribe((user: User) => {
        expect(userSpy).toHaveBeenCalled();
        expect(user).toBe(testUser);
      });
    });

    it(`should store the current user and last group in the state service`, () => {
      const userWithGroups = assign({}, testUser, { groups: [testGroup] });
      spyOn(userService, 'getCurrent').and.returnValue(Observable.of(userWithGroups));
      const updateSpy = spyOn(userService, 'update').and.returnValue(Observable.of({}));
      service.loadCurrentUser().subscribe(() => {
        expect(updateSpy).toHaveBeenCalled();
        state.auth.user$.first()
          .subscribe((user: User) => expect(user).toBe(userWithGroups));
        state.auth.group$.first()
          .subscribe((group: Group) => expect(group).toBe(testGroup));
      });
    });
  });

  describe(`#isAdminOfGroup`, () => {
    const userId1 = 'abc123';
    const userId2 = 'def456';

    beforeEach(() => state.auth.user = <User>{ _id: userId1 });

    it(`should return false if authUser or group aren't set`, () => {
      state.auth.user = null;
      service.isAdminOfGroup(null).first()
        .subscribe((isAdminOfGroup: boolean) => expect(isAdminOfGroup).toBe(false));
    });

    it(`should return false if group has no admins`, () => {
      const group = <Group>{ admins: [] };
      service.isAdminOfGroup(group).first()
        .subscribe((isAdminOfGroup: boolean) => expect(isAdminOfGroup).toBe(false));
    });

    it(`should return false if group admins doesn't include authUser`, () => {
      const group = <Group>{ admins: [userId2] };
      service.isAdminOfGroup(group).first()
        .subscribe((isAdminOfGroup: boolean) => expect(isAdminOfGroup).toBe(false));
    });

    it(`should return true if group admins includes authUser`, () => {
      const group = <Group>{ admins: [userId1, userId2] };
      service.isAdminOfGroup(group).first()
        .subscribe((isAdminOfGroup: boolean) => expect(isAdminOfGroup).toBe(true));
    });
  });

  describe(`#isMemberOfGroup`, () => {
    const group1 = <Group>{ _id: 'abc123' };
    const group2 = <Group>{ _id: 'def456' };

    it(`should return false if authUser or group aren't set`, () => {
      service.isMemberOfGroup(null).first()
        .subscribe((isMemberOfGroup: boolean) => expect(isMemberOfGroup).toBe(false));
    });

    it(`should return false if authUser has no groups`, () => {
      state.auth.user = <User>{ groups: [] };
      service.isMemberOfGroup(group1).first()
        .subscribe((isMemberOfGroup: boolean) => expect(isMemberOfGroup).toBe(false));
    });

    it(`should return false if authUser groups doesn't include specified group`, () => {
      state.auth.user = <User>{ groups: [group1] };
      service.isMemberOfGroup(group2).first()
        .subscribe((isMemberOfGroup: boolean) => expect(isMemberOfGroup).toBe(false));
    });

    it(`should return true if authUser groups includes specified group`, () => {
      state.auth.user = <User>{ groups: [group1, group2] };
      service.isMemberOfGroup(group2).first()
        .subscribe((isMemberOfGroup: boolean) => expect(isMemberOfGroup).toBe(true));
    });
  });

  describe(`#confirmEmail`, () => {
    it(`should POST token to /auth/confirm endpoint`, () => {
      const token = 'abc123';
      const response = new Response(new ResponseOptions({ body: null }));
      const httpSpy = spyOn(http, 'post').and.returnValue(Observable.of(response));
      service.confirmEmail(token).subscribe(() => {
        const url = httpSpy.calls.mostRecent().args[0];
        const data = httpSpy.calls.mostRecent().args[1];
        expect(url).toMatch(/\/auth\/confirm$/);
        expect(data['token']).toBe(token);
      });
    });
  });

  describe(`#resetPassword`, () => {
    it(`should call /auth/reset endpoint with 'email' and 'token' params`, () => {
      const password = 'Password123';
      const token = 'abc123';
      const response = new Response(new ResponseOptions({ body: null }));
      const httpSpy = spyOn(http, 'post').and.returnValue(Observable.of(response));
      service.resetPassword(password, token).subscribe(() => {
        const url = httpSpy.calls.mostRecent().args[0];
        const data = httpSpy.calls.mostRecent().args[1];
        expect(url).toMatch(/\/auth\/reset/);
        expect(data.password).toBe(password);
        expect(data.token).toBe(token);
      });
    });
  });

  describe(`#sendConfirmEmail`, () => {
    it(`should call /auth/confirm endpoint with 'email' param`, () => {
      const testEmail = 'test@example.com';
      const response = new Response(new ResponseOptions({ body: null }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.sendConfirmEmail(testEmail).subscribe(() => {
        const url = httpSpy.calls.mostRecent().args[0];
        const options = httpSpy.calls.mostRecent().args[1];
        expect(url).toMatch(/\/auth\/confirm$/);
        expect(options['search'].get('email')).toBe(testEmail);
      });
    });
  });

  describe(`#sendForgotPassword`, () => {
    it(`should call /auth/forgot endpoint with 'email' param`, () => {
      const testEmail = 'test@example.com';
      const response = new Response(new ResponseOptions({ body: null }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.sendForgotPassword(testEmail).subscribe(() => {
        const url = httpSpy.calls.mostRecent().args[0];
        const options = httpSpy.calls.mostRecent().args[1];
        expect(url).toMatch(/\/auth\/forgot/);
        expect(options['search'].get('email')).toBe(testEmail);
      });
    });
  });

  describe(`#logout`, () => {
    it(`should reset auth state`, () => {
      state.auth.isAuthenticated = true;
      state.auth.user = <User>{};
      state.auth.group = <Group>{};

      service.logout();
      state.auth.isAuthenticated$.first()
        .subscribe((isAuthenticated: boolean) => expect(isAuthenticated).toBe(false));
      state.auth.user$.first()
        .subscribe((user: User) => expect(user).toBeNull());
      state.auth.group$.first()
        .subscribe((group: Group) => expect(group).toBeNull());
    });

    it(`should pass through to Ng2AuthService.logout`, () => {
      const logoutSpy = spyOn(ng2Auth, 'logout').and.returnValue(Observable.of(undefined));
      service.logout();
      expect(logoutSpy).toHaveBeenCalled();
    });
  });
});
