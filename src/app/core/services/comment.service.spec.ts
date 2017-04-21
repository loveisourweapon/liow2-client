import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HttpStubService } from '../../../testing';
import { NewComment } from '../models';
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
});
