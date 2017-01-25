import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { Group } from '../models';

export class ActionTypes {
  static readonly SET_CURRENT = actionType('[Group] Set Current');
}

export class SetCurrentAction implements Action {
  type = ActionTypes.SET_CURRENT;

  constructor(
    public payload?: Group,
  ) { }
}

export type Actions
  = SetCurrentAction
  ;
