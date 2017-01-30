import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { User } from '../models';
import { HttpStubService } from '../../../testing';

describe(`UserService`, () => {
  let service: UserService;
  let http: JwtHttp;

  const testUser = {
    created: new Date().toDateString(),
    modified: new Date().toDateString(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: JwtHttp, useClass: HttpStubService },
      ],
    });
  });

  beforeEach(inject([UserService], (_service: UserService) => {
    service = _service;
    http = TestBed.get(JwtHttp);
  }));

  describe(`#loadCurrent`, () => {
    it(`should call /users/me endpoint`, () => {
      const response = new Response(new ResponseOptions({ body: testUser }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.loadCurrent().subscribe(() => {
        expect(httpSpy.calls.mostRecent().args[0]).toMatch(/\/users\/me$/);
      });
    });

    it(`should convert User date strings to Date objects`, () => {
      const response = new Response(new ResponseOptions({ body: testUser }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.loadCurrent().subscribe((user: User) => {
        expect(user.created instanceof Date).toBe(true);
        expect(user.modified instanceof Date).toBe(true);
      });
    });
  });
});
