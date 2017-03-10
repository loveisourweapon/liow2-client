import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { Deed } from '../deed';

export class ActionTypes {
  static readonly CLOSE = actionType('[Deed Preview Modal] Close');
  static readonly OPEN = actionType('[Deed Preview Modal] Open');
}

export class CloseAction implements Action {
  type = ActionTypes.CLOSE;
}

export class OpenAction implements Action {
  type = ActionTypes.OPEN;

  constructor(
    public payload: Deed,
  ) { }
}

export type Actions
  = CloseAction
  | OpenAction
  ;
