import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions, URLSearchParams } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { Act, ActService, CounterQuery, CounterResult } from './index';
import { Deed } from '../deed';
import { Group } from '../group';
import { HttpStubService } from '../../../testing';

describe(`ActService`, () => {
  let service: ActService;
  let http: JwtHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActService,
        { provide: JwtHttp, useClass: HttpStubService },
      ],
    });
  });

  beforeEach(inject([ActService], (_service: ActService) => {
    service = _service;
    http = TestBed.get(JwtHttp);
  }));

  describe(`#count`, () => {
    it(`should build a URLSearchParams object from the passed in CounterQuery`, () => {
      const query = <CounterQuery>{ group: 'abc123' };
      const response = new Response(new ResponseOptions({ body: '123' }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.count(query).subscribe(() => {
        const search = httpSpy.calls.mostRecent().args[1]['search'];
        expect(search instanceof URLSearchParams).toBe(true);
        expect(search.get('group')).toBe(query.group);
        expect(search.get('count')).toBe('true');
      });
    });

    it(`should return a CounterResult with a counterId and count`, () => {
      const query = <CounterQuery>{ group: 'abc123' };
      const count = 123;
      const response = new Response(new ResponseOptions({ body: String(count) }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.count(query).subscribe((result: CounterResult) => {
        expect(result.counterId).toBe(query.group);
        expect(result.count).toBe(count);
      });
    });
  });

  describe(`#done`, () => {
    const testDeed = <Deed>{ _id: 'abc123' };
    const testGroup = <Group>{ _id: 'def456' };

    it(`should pass deed and group ID's to API endpoint`, () => {
      const response = new Response(new ResponseOptions({ body: <Act>{} }));
      const httpSpy = spyOn(http, 'post').and.returnValue(Observable.of(response));
      service.done(testDeed, testGroup).subscribe(() => {
        const data = httpSpy.calls.mostRecent().args[1];
        expect(data.deed).toBe(testDeed._id);
        expect(data.group).toBe(testGroup._id);
      });
    });

    it(`should null group if not provided`, () => {
      const response = new Response(new ResponseOptions({ body: <Act>{} }));
      const httpSpy = spyOn(http, 'post').and.returnValue(Observable.of(response));
      service.done(testDeed).subscribe(() => {
        const data = httpSpy.calls.mostRecent().args[1];
        expect(data.group).toBeNull();
      });
    });
  });
});
