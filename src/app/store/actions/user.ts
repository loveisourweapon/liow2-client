import { Action } from '@ngrx/store';

import { actionType } from '../utils';

export class ActionTypes {
  static readonly COUNT = actionType('[User] Count');
  static readonly COUNT_SUCCESS = actionType('[User] Count Success');
  static readonly COUNT_FAIL = actionType('[User] Count Fail');
}

export class CountAction implements Action {
  type = ActionTypes.COUNT;
}

export class CountSuccessAction implements Action {
  type = ActionTypes.COUNT_SUCCESS;

  constructor(
    public payload: number,
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
