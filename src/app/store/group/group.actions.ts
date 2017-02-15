import { Action } from '@ngrx/store';

import { actionType, SearchParams } from '../utils';
import { Group } from './index';

export class ActionTypes {
  static readonly COUNT = actionType('[Group] Count');
  static readonly COUNT_SUCCESS = actionType('[Group] Count Success');
  static readonly COUNT_FAIL = actionType('[Group] Count Fail');
  static readonly FIND_AND_SET_CURRENT = actionType('[Group] Find and Set Current');
  static readonly FIND_AND_SET_CURRENT_FAIL = actionType('[Group] Find and Set Current Fail');
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

export class FindAndSetCurrentAction implements Action {
  type = ActionTypes.FIND_AND_SET_CURRENT;

  constructor(
    public payload: SearchParams,
  ) { }
}

export class FindAndSetCurrentFailAction implements Action {
  type = ActionTypes.FIND_AND_SET_CURRENT_FAIL;

  constructor(
    public payload: string,
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
  | FindAndSetCurrentAction
  | FindAndSetCurrentFailAction
  | SetCurrentAction
  ;
