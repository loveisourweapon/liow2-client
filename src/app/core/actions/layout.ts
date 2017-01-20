import { Action } from '@ngrx/store';

import { actionType } from '../utils';

export class ActionTypes {
  static readonly TOGGLE_MENU = actionType('[Layout] Toggle Menu');
  static readonly CLOSE_MENU = actionType('[Layout] Close Menu');
}

export class ToggleMenuAction implements Action {
  type = ActionTypes.TOGGLE_MENU;
}

export class CloseMenuAction implements Action {
  type = ActionTypes.CLOSE_MENU;
}

export type Actions
  = ToggleMenuAction
  | CloseMenuAction
  ;
