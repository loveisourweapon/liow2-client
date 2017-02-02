import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { Group } from '../models';

export class ActionTypes {
  static readonly COUNT = actionType('[Group] Count');
  static readonly COUNT_SUCCESS = actionType('[Group] Count Success');
  static readonly COUNT_FAIL = actionType('[Group] Count Fail');
  static readonly SET_CURRENT = actionType('[Group] Set Current');
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

export class SetCurrentAction implements Action {
  type = ActionTypes.SET_CURRENT;

  constructor(
    public payload: Group,
  ) { }
}

export type Actions
  = CountAction
  | CountSuccessAction
  | CountFailAction
  | SetCurrentAction
  ;
