import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions, URLSearchParams } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HttpStubService } from '../../../testing';
import { Act, CounterQuery, Deed, Group } from '../models';
import { StateService } from './state.service';
import { ActService } from './act.service';

describe(`ActService`, () => {
  let service: ActService;
  let http: JwtHttp;
  let state: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActService,
        { provide: JwtHttp, useClass: HttpStubService },
        StateService,
      ],
    });
  });

  beforeEach(inject([ActService], (_service: ActService) => {
    service = _service;
    http = TestBed.get(JwtHttp);
    state = TestBed.get(StateService);
  }));

  describe(`#count`, () => {
    const testQuery = <CounterQuery>{ group: 'abc123' };
    const testCount = 123;
    const response = new Response(new ResponseOptions({ body: String(testCount) }));

    it(`should build a URLSearchParams object from the passed in CounterQuery`, () => {
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.count(testQuery);

      const search = httpSpy.calls.mostRecent().args[1]['search'];
      expect(search instanceof URLSearchParams).toBe(true);
      expect(search.get('group')).toBe(testQuery.group);
      expect(search.get('count')).toBe('true');
    });

    it(`should call state.updateCounter with counterId and count`, () => {
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      const stateSpy = spyOn(state, 'updateCounter');
      service.count(testQuery);
      expect(stateSpy).toHaveBeenCalledWith(testQuery.group, testCount);
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
