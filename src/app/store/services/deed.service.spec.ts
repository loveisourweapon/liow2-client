import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions, URLSearchParams } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { DeedService } from './deed.service';
import { Deed } from '../models';
import { HttpStubService } from '../../../testing';

describe(`DeedService`, () => {
  let service: DeedService;
  let http: JwtHttp;

  const testDeed = {
    created: new Date().toDateString(),
    modified: new Date().toDateString(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeedService,
        { provide: JwtHttp, useClass: HttpStubService },
      ],
    });
  });

  beforeEach(inject([DeedService], (_service: DeedService) => {
    service = _service;
    http = TestBed.get(JwtHttp);
  }));

  describe(`#find`, () => {
    it(`should pass search params to http.get`, () => {
      const response = new Response(new ResponseOptions({ body: [testDeed] }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      const search = new URLSearchParams();
      service.find(search).subscribe(() => {
        const requestOptions = httpSpy.calls.mostRecent().args[1];
        expect(requestOptions.search).toBe(search);
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

  describe(`#countAll`, () => {
    it(`should call /deeds/counters endpoint`, () => {
      const response = new Response(new ResponseOptions({ body: {} }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.countAll().subscribe(() => {
        expect(httpSpy.calls.mostRecent().args[0]).toMatch(/\/deeds\/counters$/);
      });
    });
  });
});
