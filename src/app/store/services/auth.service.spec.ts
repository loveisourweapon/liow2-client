import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { AuthService as Ng2AuthService } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { Credentials } from '../models';
import { Ng2AuthStubService } from '../../../testing';

describe(`DeedService`, () => {
  let service: AuthService;
  let ng2Auth: Ng2AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Ng2AuthService, useClass: Ng2AuthStubService },
      ],
    });
  });

  beforeEach(inject([AuthService], (_service: AuthService) => {
    service = _service;
    ng2Auth = TestBed.get(Ng2AuthService);
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
