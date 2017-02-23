import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { AuthService as Ng2AuthService, JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { AuthService, Credentials } from './index';
import { HttpStubService, Ng2AuthStubService } from '../../../testing';

describe(`AuthService`, () => {
  let service: AuthService;
  let ng2Auth: Ng2AuthService;
  let http: JwtHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Ng2AuthService, useClass: Ng2AuthStubService },
        { provide: JwtHttp, useClass: HttpStubService },
      ],
    });
  });

  beforeEach(inject([AuthService], (_service: AuthService) => {
    service = _service;
    ng2Auth = TestBed.get(Ng2AuthService);
    http = TestBed.get(JwtHttp);
  }));

  describe(`#authenticateEmail`, () => {
    it(`should throw if email and password not provided`, () => {
      const credentials = <Credentials>{};
      service.authenticateEmail(credentials).subscribe(() => {}, error => {
        expect(error.message).toBe(`Please provide email and password`);
      });
    });

    it(`should pass credentials through to Ng2AuthService.login`, () => {
      const credentials = <Credentials>{
        email: 'test@example.com',
        password: 'testing123',
      };
      const tokenResponse = { token: 'abc123' };
      const response = new Response(new ResponseOptions({ body: tokenResponse }));
      const authSpy = spyOn(ng2Auth, 'login').and.returnValue(Observable.of(response));
      service.authenticateEmail(credentials).subscribe((token: string) => {
        expect(authSpy).toHaveBeenCalledWith(credentials);
        expect(token).toBe(tokenResponse.token);
      });
    });
  });

  describe(`#authenticateFacebook`, () => {
    it(`should call Ng2AuthService.authenticate with 'facebook' param`, () => {
      const tokenResponse = { token: 'abc123' };
      const response = new Response(new ResponseOptions({ body: tokenResponse }));
      const authSpy = spyOn(ng2Auth, 'authenticate').and.returnValue(Observable.of(response));
      service.authenticateFacebook().subscribe((token: string) => {
        expect(authSpy.calls.mostRecent().args[0]).toBe('facebook');
        expect(token).toBe(tokenResponse.token);
      });
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

  describe(`#isAuthenticated`, () => {
    it(`should pass directly through to Ng2AuthService.isAuthenticated`, () => {
      const isAuthenticated = true;
      const isAuthSpy = spyOn(ng2Auth, 'isAuthenticated').and.returnValue(isAuthenticated);
      const result = service.isAuthenticated();
      expect(isAuthSpy).toHaveBeenCalled();
      expect(result).toBe(isAuthenticated);
    });
  });

  describe(`#logout`, () => {
    it(`should pass directly through to Ng2AuthService.logout`, () => {
      const logoutSpy = spyOn(ng2Auth, 'logout').and.returnValue(Observable.of(undefined));
      service.logout();
      expect(logoutSpy).toHaveBeenCalled();
    });
  });
});
