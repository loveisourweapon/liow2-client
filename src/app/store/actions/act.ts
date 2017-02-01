import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { CounterQuery, CounterResult } from '../models';

export class ActionTypes {
  static readonly COUNT = actionType('[Act] Count');
  static readonly COUNT_SUCCESS = actionType('[Act] Count Success');
  static readonly COUNT_FAIL = actionType('[Act] Count Fail');
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
    public payload: any,
  ) { }
}

export type Actions
  = CountAction
  | CountSuccessAction
  | CountFailAction
  ;
