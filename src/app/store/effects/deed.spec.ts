import { inject, TestBed } from '@angular/core/testing';
import { Http, Response, ResponseOptions } from '@angular/http';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { DeedEffects } from './deed';
import * as deed from '../actions/deed';
import { API_BASE_URL } from '../../core';
import { apiBaseUrlTest, HttpStubService } from '../../../testing';

describe('DeedEffects', () => {
  let runner: EffectsRunner;
  let deedEffects: DeedEffects;
  let http: Http;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
    ],
    providers: [
      DeedEffects,
      { provide: Http, useClass: HttpStubService },
      { provide: API_BASE_URL, useValue: apiBaseUrlTest  },
    ],
  }));

  beforeEach(inject([
      EffectsRunner,
      DeedEffects,
    ],
    (_runner, _deedEffects) => {
      runner = _runner;
      deedEffects = _deedEffects;
      http = TestBed.get(Http);
    }
  ));

  it(`should trigger FIND_SUCCESS after FIND action and successful http request`, () => {
    const payload = [];
    const response = new Response(new ResponseOptions({ body: payload }));
    const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));

    runner.queue(new deed.FindAction());
    deedEffects.find$.subscribe(result => {
      expect(result.type).toBe(deed.ActionTypes.FIND_SUCCESS);
      expect(result.payload).toBe(payload);
      expect(httpSpy).toHaveBeenCalledWith(`${apiBaseUrlTest}/deeds`);
    });
  });

  it(`should trigger FIND_FAIL after FIND action and failed http request`, () => {
    const response = new Response(new ResponseOptions({ status: 500 }));
    spyOn(http, 'get').and.returnValue(Observable.throw(response));

    runner.queue(new deed.FindAction());
    deedEffects.find$.subscribe(result => {
      expect(result.type).toBe(deed.ActionTypes.FIND_FAIL);
    });
  });
});
