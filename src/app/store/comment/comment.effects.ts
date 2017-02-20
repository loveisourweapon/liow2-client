import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CommentService } from './comment.service';
import { NewComment } from './index';
import * as comment from './comment.actions';
import * as alertify from '../alertify/alertify.actions';

@Injectable()
export class CommentEffects {
  @Effect()
  comment$: Observable<Action> = this.actions$
    .ofType(comment.ActionTypes.COMMENT).map(toPayload)
    .flatMap((newComment: NewComment) => this.commentService.save(newComment)
      .mergeMap(() => Observable.from([
        // TODO: refresh feed?
        // new feed.LoadAction(),
        new comment.CommentSuccessAction(),
        new alertify.SuccessAction(`Comment saved`),
      ]))
      .catch(() => Observable.from([
        new comment.CommentFailAction(),
        new alertify.ErrorAction(`Failed saving comment`),
      ])));

  constructor(
    private actions$: Actions,
    private commentService: CommentService,
  ) { }
}
