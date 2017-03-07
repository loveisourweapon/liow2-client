import { Action } from '@ngrx/store';

import { actionType } from '../utils';

export class ActionTypes {
  static readonly SET_IS_MENU_OPEN = actionType('[Layout] Set is Menu Open');
  static readonly SET_IS_SMALL_SCREEN = actionType('[Layout] Set is Small Screen');
}

export class SetIsMenuOpenAction implements Action {
  type = ActionTypes.SET_IS_MENU_OPEN;

  constructor(
    public payload: boolean,
  ) { }
}

export class SetIsSmallScreenAction implements Action {
  type = ActionTypes.SET_IS_SMALL_SCREEN;

  constructor(
    public payload: boolean,
  ) { }
}

export type Actions
  = SetIsMenuOpenAction
  | SetIsSmallScreenAction
  ;
