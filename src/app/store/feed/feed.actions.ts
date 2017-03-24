import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { FeedCriteria, FeedItem } from './index';

export class ActionTypes {
  static readonly LOAD_FAIL = actionType('[Feed] Load Fail');
  static readonly LOAD_INITIAL = actionType('[Feed] Load Initial');
  static readonly LOAD_INITIAL_SUCCESS = actionType('[Feed] Load Initial Success');
  static readonly LOAD_NEWER = actionType('[Feed] Load Newer');
  static readonly LOAD_NEWER_SUCCESS = actionType('[Feed] Load Newer Success');
  static readonly LOAD_OLDER = actionType('[Feed] Load Older');
  static readonly LOAD_OLDER_SUCCESS = actionType('[Feed] Load Older Success');
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;
  payload = null;
}

export class LoadInitialAction implements Action {
  type = ActionTypes.LOAD_INITIAL;

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

export class LoadNewerAction implements Action {
  type = ActionTypes.LOAD_NEWER;
  payload = null;
}

export class LoadNewerSuccessAction implements Action {
  type = ActionTypes.LOAD_NEWER_SUCCESS;

  constructor(
    public payload: FeedItem[],
  ) { }
}

export class LoadOlderAction implements Action {
  type = ActionTypes.LOAD_OLDER;
  payload = null;
}

export class LoadOlderSuccessAction implements Action {
  type = ActionTypes.LOAD_OLDER_SUCCESS;

  constructor(
    public payload: FeedItem[],
  ) { }
}

export type Actions
  = LoadFailAction
  | LoadInitialAction
  | LoadInitialSuccessAction
  | LoadNewerAction
  | LoadNewerSuccessAction
  | LoadOlderAction
  | LoadOlderSuccessAction
  ;
