import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HttpStubService } from '../../../testing';
import { FeedCriteria, FeedItem } from '../models';
import { FeedService } from './feed.service';

describe(`FeedService`, () => {
  let service: FeedService;
  let http: JwtHttp;

  const testFeedItem = {
    _id: 'abc123',
    created: new Date().toDateString(),
    user: { _id: 'def456' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeedService,
        { provide: JwtHttp, useClass: HttpStubService },
      ],
    });
  });

  beforeEach(inject([FeedService], (_service: FeedService) => {
    service = _service;
    http = TestBed.get(JwtHttp);
  }));

  describe(`#load`, () => {
    it(`should pass FeedCriteria as search params to http.get`, () => {
      const response = new Response(new ResponseOptions({ body: [testFeedItem] }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      const criteria = <FeedCriteria>{ 'target.group': 'ghi789' };
      service.load(criteria).subscribe(() => {
        const requestOptions = httpSpy.calls.mostRecent().args[1];
        expect(requestOptions.search.get('target.group')).toBe(criteria['target.group']);
      });
    });

    it(`should convert FeedItem date strings to Date objects`, () => {
      const response = new Response(new ResponseOptions({ body: [testFeedItem] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.load({}).subscribe((feedItems: FeedItem[]) => {
        expect(feedItems[0].created instanceof Date).toBe(true);
      });
    });

    it(`should add a picture property to the FeedItem.user property`, () => {
      const response = new Response(new ResponseOptions({ body: [testFeedItem] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.load({}).subscribe((feedItems: FeedItem[]) => {
        expect(feedItems[0].user.picture).toMatch(/^\/images\/user(\d|1[01]).png$/);
      });
    });
  });
});
