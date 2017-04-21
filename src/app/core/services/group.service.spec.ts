import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { assign } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HttpStubService } from '../../../testing';
import { Group } from '../models';
import { GroupService } from './group.service';

describe(`GroupService`, () => {
  let service: GroupService;
  let http: JwtHttp;

  const testGroup = {
    created: new Date().toDateString(),
    modified: new Date().toDateString(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupService,
        { provide: JwtHttp, useClass: HttpStubService },
      ],
    });
  });

  beforeEach(inject([GroupService], (_service: GroupService) => {
    service = _service;
    http = TestBed.get(JwtHttp);
  }));

  describe(`#find`, () => {
    it(`should pass search params to http.get`, () => {
      const response = new Response(new ResponseOptions({ body: [testGroup] }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      const params = { property: 'value' };
      service.find(params).subscribe(() => {
        const requestOptions = httpSpy.calls.mostRecent().args[1];
        expect(requestOptions.search.get('property')).toBe(params.property);
      });
    });

    it(`should convert Group date strings to Date objects`, () => {
      const response = new Response(new ResponseOptions({ body: [testGroup] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.find().subscribe((groups: Group[]) => {
        expect(groups[0].created instanceof Date).toBe(true);
        expect(groups[0].modified instanceof Date).toBe(true);
      });
    });

    it(`should generate a Group coverImage`, () => {
      const response = new Response(new ResponseOptions({ body: [testGroup] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.find().subscribe((groups: Group[]) => {
        expect(groups[0].coverImage).toMatch(/^\/images\/header[0-5].jpg$/);
      });
    });
  });

  describe(`#findOne`, () => {
    it(`should return a single Group`, () => {
      const response = new Response(new ResponseOptions({ body: [testGroup] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.findOne().subscribe((group: Group) => expect(group).toBe(testGroup));
    });

    it(`should throw an error if no Groups found`, () => {
      const response = new Response(new ResponseOptions({ body: [] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.findOne().subscribe(() => {}, (error) => expect(error.message).toBe(`Group not found`));
    });

    it(`should throw an error if more than one Group found`, () => {
      const response = new Response(new ResponseOptions({ body: [testGroup, testGroup] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.findOne().subscribe(() => {}, (error) => expect(error.message).toBe(`Group not found`));
    });
  });

  describe(`#save`, () => {
    const newGroup = {
      name: 'Test group name',
      welcomeMessage: 'Test **welcome** message',
      admins: [],
    };

    it(`should POST to /groups if passed in group doesn't have an ID`, () => {
      const response = new Response(new ResponseOptions({ body: newGroup }));
      const httpSpy = spyOn(http, 'post').and.returnValue(Observable.of(response));
      service.save(newGroup).subscribe(() => {
        expect(httpSpy.calls.mostRecent().args[0]).toMatch(/\/groups/);
        expect(httpSpy.calls.mostRecent().args[1]).toBe(newGroup);
      });
    });

    it(`should PUT to /groups/:groupId if passed in user has an ID`, () => {
      const updatedGroup = assign({}, newGroup, { _id: 'abc123' });
      const response = new Response(new ResponseOptions({ body: updatedGroup }));
      const httpSpy = spyOn(http, 'put').and.returnValue(Observable.of(response));
      service.save(updatedGroup).subscribe(() => {
        expect(httpSpy.calls.mostRecent().args[0]).toMatch(new RegExp(`/groups/${updatedGroup._id}$`));
        expect(httpSpy.calls.mostRecent().args[1]).toBe(updatedGroup);
      });
    });
  });

  describe(`#count`, () => {
    it(`should call /groups endpoint with '?count=true' query`, () => {
      const response = new Response(new ResponseOptions({ body: '123' }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.count().subscribe(() => {
        const url = httpSpy.calls.mostRecent().args[0];
        const search = httpSpy.calls.mostRecent().args[1]['search'];
        expect(url).toMatch(/\/groups$/);
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
