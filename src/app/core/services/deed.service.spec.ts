import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HttpStubService } from '../../../testing';
import { Deed } from '../models';
import { StateService } from './state.service';
import { DeedService } from './deed.service';

describe(`DeedService`, () => {
  let service: DeedService;
  let http: JwtHttp;
  let state: StateService;

  const testDeed = {
    created: new Date().toDateString(),
    modified: new Date().toDateString(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeedService,
        { provide: JwtHttp, useClass: HttpStubService },
        StateService,
      ],
    });
  });

  beforeEach(inject([DeedService], (_service: DeedService) => {
    service = _service;
    http = TestBed.get(JwtHttp);
    state = TestBed.get(StateService);
  }));

  describe(`#find`, () => {
    it(`should pass search params to http.get`, () => {
      const response = new Response(new ResponseOptions({ body: [testDeed] }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      const params = { property: 'value' };
      service.find(params).subscribe(() => {
        const requestOptions = httpSpy.calls.mostRecent().args[1];
        expect(requestOptions.search.get('property')).toBe(params.property);
      });
    });

    it(`should convert Deed date strings to Date objects`, () => {
      const response = new Response(new ResponseOptions({ body: [testDeed] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.find().subscribe((deeds: Deed[]) => {
        expect(deeds[0].created instanceof Date).toBe(true);
        expect(deeds[0].modified instanceof Date).toBe(true);
      });
    });
  });

  describe(`#findOne`, () => {
    it(`should return a single Deed`, () => {
      const response = new Response(new ResponseOptions({ body: [testDeed] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.findOne().subscribe((deed) => expect<any>(deed).toBe(testDeed));
    });

    it(`should throw an error if no Deeds found`, () => {
      const response = new Response(new ResponseOptions({ body: [] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.findOne().subscribe(() => {}, (error) => expect(error.message).toBe(`Deed not found`));
    });

    it(`should throw an error if more than one Deed found`, () => {
      const response = new Response(new ResponseOptions({ body: [testDeed, testDeed] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.findOne().subscribe(() => {}, (error) => expect(error.message).toBe(`Deed not found`));
    });
  });

  describe(`#countAll`, () => {
    const deedCounters = [
      { deed: 'abc123', count: 123 },
      { deed: 'def123', count: 456 },
    ];
    const response = new Response(new ResponseOptions({ body: deedCounters }));

    it(`should call /deeds/counters endpoint`, () => {
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.countAll();
      expect(httpSpy.calls.mostRecent().args[0]).toMatch(/\/deeds\/counters$/);
    });

    it(`should store each of the deed counters in the state service`, () => {
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      const stateSpy = spyOn(state, 'updateCounter');
      service.countAll();
      expect(stateSpy).toHaveBeenCalledTimes(2);
      expect(stateSpy).toHaveBeenCalledWith(deedCounters[0].deed, deedCounters[0].count);
      expect(stateSpy).toHaveBeenCalledWith(deedCounters[1].deed, deedCounters[1].count);
    });
  });
});
