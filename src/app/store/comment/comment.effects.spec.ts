import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CommentEffects, CommentService, NewComment } from './index';
import * as comment from './comment.actions';
import * as alertify from '../alertify/alertify.actions';
import { CommentStubService, takeAndScan } from '../../../testing';

describe(`CommentEffects`, () => {
  let runner: EffectsRunner;
  let commentEffects: CommentEffects;
  let commentService: CommentService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          CommentEffects,
          { provide: CommentService, useClass: CommentStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, CommentEffects], (_runner, _commentEffects) => {
    runner = _runner;
    commentEffects = _commentEffects;
    commentService = TestBed.get(CommentService);
  }));

  describe(`comment$`, () => {
    const testComment = <NewComment>{
      group: 'abc123',
      target: { deed: 'def456' },
      content: { text: 'A testimony' },
    };

    it(`should dispatch COMMENT_SUCCESS and alertify SUCCESS actions after successful save request`, () => {
      spyOn(commentService, 'save').and.returnValue(Observable.of({}));
      runner.queue(new comment.CommentAction(testComment));
      takeAndScan(commentEffects.comment$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(comment.ActionTypes.COMMENT_SUCCESS);
          expect(results[1].type).toBe(alertify.ActionTypes.SUCCESS);
        });
    });

    it(`should dispatch COMMENT_FAIL and alertify ERROR actions after failed save request`, () => {
      spyOn(commentService, 'save').and.returnValue(Observable.throw(new Error()));
      runner.queue(new comment.CommentAction(testComment));
      takeAndScan(commentEffects.comment$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(comment.ActionTypes.COMMENT_FAIL);
          expect(results[1].type).toBe(alertify.ActionTypes.ERROR);
        });
    });
  });
});
