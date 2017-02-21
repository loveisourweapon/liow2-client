import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CommentService } from './comment.service';
import { NewComment } from './index';
import * as alertify from '../alertify/alertify.actions';
import * as comment from './comment.actions';
import * as feed from '../feed/feed.actions';

@Injectable()
export class CommentEffects {
  @Effect()
  comment$: Observable<Action> = this.actions$
    .ofType(comment.ActionTypes.COMMENT).map(toPayload)
    .flatMap((newComment: NewComment) => this.commentService.save(newComment)
      .mergeMap(() => Observable.from([
        new comment.CommentSuccessAction(),
        new feed.LoadNewerAction(),
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
