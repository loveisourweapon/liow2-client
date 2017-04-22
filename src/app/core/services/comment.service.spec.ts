import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HttpStubService } from '../../../testing';
import { Comment, NewComment } from '../models';
import { CommentService } from '../services';

describe(`CommentService`, () => {
  let service: CommentService;
  let http: JwtHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentService,
        { provide: JwtHttp, useClass: HttpStubService },
      ],
    });
  });

  beforeEach(inject([CommentService], (_service: CommentService) => {
    service = _service;
    http = TestBed.get(JwtHttp);
  }));

  describe(`#save`, () => {
    const testComment = <NewComment>{
      group: 'abc123',
      target: { deed: 'def456' },
      content: { text: 'A testimony' },
    };

    it(`should POST to /deeds/{id}/comments when saving a testimony`, () => {
      const response = new Response(new ResponseOptions({ body: testComment }));
      const httpSpy = spyOn(http, 'post').and.returnValue(Observable.of(response));
      service.save(testComment).subscribe(() => {
        const url = httpSpy.calls.mostRecent().args[0];
        expect(url).toMatch(new RegExp(`/deeds/${testComment.target.deed}/comments$`));
      });
    });
  });

  describe(`#find`, () => {
    const testComment = {
      _id: 'jkl123',
      created: new Date().toDateString(),
      group: 'def456',
      target: { deed: 'ghi789' },
      content: { text: 'A testimony' },
      user: { _id: 'abc123' }
    };

    it(`should pass search params to http.get`, () => {
      const response = new Response(new ResponseOptions({ body: [testComment] }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      const params = { property: 'value' };
      service.find(params).subscribe(() => {
        const requestOptions = httpSpy.calls.mostRecent().args[1];
        expect(requestOptions.search.get('property')).toBe(params.property);
      });
    });

    it(`should convert Comment date strings to Date objects`, () => {
      const response = new Response(new ResponseOptions({ body: [testComment] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.find().subscribe((comments: Comment[]) => {
        expect(comments[0].created instanceof Date).toBe(true);
      });
    });

    it(`should set the User picture property if not set`, () => {
      const response = new Response(new ResponseOptions({ body: [testComment] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.find().subscribe((comments: Comment[]) => {
        expect(comments[0].user.picture).toMatch(/^\/images\/user(\d|1[01]).png$/);
      });
    });
  });

  describe(`#count`, () => {
    it(`should call /comments endpoint with '?count=true' query`, () => {
      const response = new Response(new ResponseOptions({ body: '123' }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.count().subscribe(() => {
        const url = httpSpy.calls.mostRecent().args[0];
        const search = httpSpy.calls.mostRecent().args[1]['search'];
        expect(url).toMatch(/\/comments$/);
        expect(search.get('count')).toBe(true);
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
