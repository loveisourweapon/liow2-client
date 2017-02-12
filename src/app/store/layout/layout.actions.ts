import { Action } from '@ngrx/store';

import { actionType } from '../utils';

export class ActionTypes {
  static readonly CLOSE_MENU = actionType('[Layout] Close Menu');
  static readonly TOGGLE_MENU = actionType('[Layout] Toggle Menu');
}

export class CloseMenuAction implements Action {
  type = ActionTypes.CLOSE_MENU;
}

export class ToggleMenuAction implements Action {
  type = ActionTypes.TOGGLE_MENU;
}

export type Actions
  = CloseMenuAction
  | ToggleMenuAction
  ;
