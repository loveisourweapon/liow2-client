import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { NewComment } from './index';

export class ActionTypes {
  static readonly COMMENT = actionType('[Comment] Comment');
  static readonly COMMENT_SUCCESS = actionType('[Comment] Comment Success');
  static readonly COMMENT_FAIL = actionType('[Comment] Comment Done');
}

export class CommentAction implements Action {
  type = ActionTypes.COMMENT;

  constructor(
    public payload: NewComment,
  ) { }
}

export class CommentSuccessAction implements Action {
  type = ActionTypes.COMMENT_SUCCESS;
}

export class CommentFailAction implements Action {
  type = ActionTypes.COMMENT_FAIL;
}

export type Actions
  = CommentAction
  | CommentSuccessAction
  | CommentFailAction
  ;
