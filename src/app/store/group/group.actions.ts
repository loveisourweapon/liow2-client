import { Action } from '@ngrx/store';

import { actionType, ApiError, SearchParams } from '../utils';
import { NewGroup, Group } from './index';

export class ActionTypes {
  static readonly COUNT = actionType('[Group] Count');
  static readonly COUNT_SUCCESS = actionType('[Group] Count Success');
  static readonly COUNT_FAIL = actionType('[Group] Count Fail');
  static readonly CREATE = actionType('[Group] Create');
  static readonly CREATE_SUCCESS = actionType('[Group] Create Success');
  static readonly CREATE_FAIL = actionType('[Group] Create Fail');
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

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(
    public payload: { group: NewGroup, setupCampaign: boolean },
  ) { }
}
export class CreateSuccessAction implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(
    public payload: Group,
  ) { }
}
export class CreateFailAction implements Action {
  type = ActionTypes.CREATE_FAIL;

  constructor(
    public payload: ApiError,
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
  | CreateAction
  | CreateSuccessAction
  | CreateFailAction
  | FindAndSetCurrentAction
  | FindAndSetCurrentFailAction
  | SetCurrentAction
  ;
