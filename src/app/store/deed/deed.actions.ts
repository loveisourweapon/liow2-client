import { Action } from '@ngrx/store';

import { actionType, SearchParams } from '../utils';
import { Deed } from './index';
import { DeedCounterResult } from '../act';

export class ActionTypes {
  static readonly ALL_COUNTERS = actionType('[Deed] All Counters');
  static readonly ALL_COUNTERS_SUCCESS = actionType('[Deed] All Counters Success');
  static readonly ALL_COUNTERS_FAIL = actionType('[Deed] All Counters Fail');
  static readonly FIND_ALL = actionType('[Deed] Find All');
  static readonly FIND_ALL_SUCCESS = actionType('[Deed] Find All Success');
  static readonly FIND_ALL_FAIL = actionType('[Deed] Find All Fail');
  static readonly FIND_AND_SET_CURRENT = actionType('[Deed] Find and Set Current');
  static readonly FIND_AND_SET_CURRENT_FAIL = actionType('[Deed] Find and Set Current Fail');
  static readonly SET_CURRENT = actionType('[Deed] Set Current');
}

export class AllCountersAction implements Action {
  type = ActionTypes.ALL_COUNTERS;
}

export class AllCountersSuccessAction implements Action {
  type = ActionTypes.ALL_COUNTERS_SUCCESS;

  constructor(
    public payload: DeedCounterResult[],
  ) { }
}

export class AllCountersFailAction implements Action {
  type = ActionTypes.ALL_COUNTERS_FAIL;

  constructor(
    public payload: any,
  ) { }
}

export class FindAllAction implements Action {
  type = ActionTypes.FIND_ALL;
}

export class FindAllSuccessAction implements Action {
  type = ActionTypes.FIND_ALL_SUCCESS;

  constructor(
    public payload: Deed[],
  ) { }
}

export class FindAllFailAction implements Action {
  type = ActionTypes.FIND_ALL_FAIL;

  constructor(
    public payload: string,
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
    public payload: Deed,
  ) { }
}

export type Actions
  = AllCountersAction
  | AllCountersSuccessAction
  | AllCountersFailAction
  | FindAllAction
  | FindAllSuccessAction
  | FindAllFailAction
  | FindAndSetCurrentAction
  | FindAndSetCurrentFailAction
  | SetCurrentAction
  ;
