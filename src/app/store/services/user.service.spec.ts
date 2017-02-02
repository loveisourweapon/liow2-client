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
    _id: 'abc123',
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

  describe(`#get`, () => {
    const userId = 'abc123';

    it(`should call /users/:userId endpoint`, () => {
      const response = new Response(new ResponseOptions({ body: testUser }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.get(userId).subscribe(() => {
        expect(httpSpy.calls.mostRecent().args[0]).toMatch(new RegExp(`\/users\/${userId}`));
      });
    });

    it(`should convert User date strings to Date objects`, () => {
      const response = new Response(new ResponseOptions({ body: testUser }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.get(userId).subscribe((user: User) => {
        expect(user.created instanceof Date).toBe(true);
        expect(user.modified instanceof Date).toBe(true);
      });
    });

    it(`should set the picture property if not set`, () => {
      const response = new Response(new ResponseOptions({ body: testUser }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.get(userId).subscribe((user: User) => {
        expect(user.picture).toMatch(/^\/images\/user(\d|1[01]).png$/);
      });
    });

    it(`should generate a User coverImage`, () => {
      const response = new Response(new ResponseOptions({ body: testUser }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.get(userId).subscribe((user: User) => {
        expect(user.coverImage).toMatch(/^\/images\/header[0-5].jpg$/);
      });
    });
  });

  describe(`#getCurrent`, () => {
    it(`should call /users/me endpoint`, () => {
      const response = new Response(new ResponseOptions({ body: testUser }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.getCurrent().subscribe(() => {
        expect(httpSpy.calls.mostRecent().args[0]).toMatch(/\/users\/me$/);
      });
    });
  });

  describe(`#count`, () => {
    it(`should call /users endpoint with '?count=true' query`, () => {
      const response = new Response(new ResponseOptions({ body: '123' }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.count().subscribe(() => {
        const url = httpSpy.calls.mostRecent().args[0];
        const search = httpSpy.calls.mostRecent().args[1]['search'];
        expect(url).toMatch(/\/users$/);
        expect(search.get('count')).toBe('true');
      });
    });

    it(`should convert text response to number`, () => {
      const count = '123';
      const response = new Response(new ResponseOptions({ body: count }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.count().subscribe((result: number) => {
        expect(typeof result).toBe('number');
        expect(result).toBe(Number(count));
      });
    });
  });
});
