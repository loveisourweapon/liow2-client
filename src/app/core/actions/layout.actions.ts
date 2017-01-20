import { Action } from '@ngrx/store';

export class LayoutActionTypes {
  static readonly TOGGLE_MENU = '[Layout] Toggle Menu';
  static readonly CLOSE_MENU = '[Layout] Close Menu';
}

export class ToggleMenuAction implements Action {
  type = LayoutActionTypes.TOGGLE_MENU;
}

export class CloseMenuAction implements Action {
  type = LayoutActionTypes.CLOSE_MENU;
}

export type LayoutActions
  = ToggleMenuAction
  | CloseMenuAction;
