import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { CounterQuery, CounterResult } from './index';
import { Deed } from '../deed';
import { Group } from '../group';

export class ActionTypes {
  static readonly COUNT = actionType('[Act] Count');
  static readonly COUNT_SUCCESS = actionType('[Act] Count Success');
  static readonly COUNT_FAIL = actionType('[Act] Count Fail');
  static readonly DONE = actionType('[Act] Done');
  static readonly DONE_SUCCESS = actionType('[Act] Done Success');
  static readonly DONE_FAIL = actionType('[Act] Done Fail');
}

export class CountAction implements Action {
  type = ActionTypes.COUNT;

  constructor(
    public payload?: CounterQuery,
  ) { }
}

export class CountSuccessAction implements Action {
  type = ActionTypes.COUNT_SUCCESS;

  constructor(
    public payload: CounterResult,
  ) { }
}

export class CountFailAction implements Action {
  type = ActionTypes.COUNT_FAIL;

  constructor(
    public payload: string,
  ) { }
}

export class DoneAction implements Action {
  type = ActionTypes.DONE;

  constructor(
    public payload: { deed: Deed, group?: Group },
  ) { }
}

export class DoneSuccessAction implements Action {
  type = ActionTypes.DONE_SUCCESS;
  payload = null;
}

export class DoneFailAction implements Action {
  type = ActionTypes.DONE_FAIL;

  constructor(
    public payload: string,
  ) { }
}

export type Actions
  = CountAction
  | CountSuccessAction
  | CountFailAction
  | DoneAction
  | DoneSuccessAction
  | DoneFailAction
  ;
