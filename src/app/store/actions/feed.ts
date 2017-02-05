import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { FeedCriteria, FeedItem } from '../models';

export class ActionTypes {
  static readonly LOAD = actionType('[Feed] Load');
  static readonly LOAD_INITIAL_SUCCESS = actionType('[Feed] Load Initial Success');
  static readonly LOAD_NEWER_SUCCESS = actionType('[Feed] Load Newer Success');
  static readonly LOAD_OLDER_SUCCESS = actionType('[Feed] Load Older Success');
  static readonly LOAD_FAIL = actionType('[Feed] Load Fail');
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(
    public payload: FeedCriteria,
  ) { }
}

export class LoadInitialSuccessAction implements Action {
  type = ActionTypes.LOAD_INITIAL_SUCCESS;

  constructor(
    public payload: FeedItem[],
  ) { }
}

export class LoadNewerSuccessAction implements Action {
  type = ActionTypes.LOAD_NEWER_SUCCESS;

  constructor(
    public payload: FeedItem[],
  ) { }
}

export class LoadOlderSuccessAction implements Action {
  type = ActionTypes.LOAD_OLDER_SUCCESS;

  constructor(
    public payload: FeedItem[],
  ) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(
    public payload: any,
  ) { }
}

export type Actions
  = LoadAction
  | LoadInitialSuccessAction
  | LoadNewerSuccessAction
  | LoadOlderSuccessAction
  | LoadFailAction
  ;
