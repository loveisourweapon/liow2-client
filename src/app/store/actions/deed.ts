import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { Deed } from '../models';

export class ActionTypes {
  static readonly FIND = actionType('[Deed] Find');
  static readonly FIND_SUCCESS = actionType('[Deed] Find Success');
  static readonly FIND_FAIL = actionType('[Deed] Find Fail');
  static readonly SET_CURRENT = actionType('[Deed] Set Current');
}

export class FindAction implements Action {
  type = ActionTypes.FIND;
}

export class FindSuccessAction implements Action {
  type = ActionTypes.FIND_SUCCESS;

  constructor(
    public payload: Deed[],
  ) { }
}

export class FindFailAction implements Action {
  type = ActionTypes.FIND_FAIL;

  constructor(
    public payload: any,
  ) { }
}

export class SetCurrentAction implements Action {
  type = ActionTypes.SET_CURRENT;

  constructor(
    public payload: Deed,
  ) { }
}

export type Actions
  = FindAction
  | FindSuccessAction
  | FindFailAction
  | SetCurrentAction
  ;
