import { Action } from '@ngrx/store';

import { actionType } from '../../utils';

export class ActionTypes {
  static readonly OPEN = actionType('[Login Modal] Open');
  static readonly CLOSE = actionType('[Login Modal] Close');
  static readonly UPDATE_EMAIL = actionType('[Login Modal] Update Email');
  static readonly UPDATE_PASSWORD = actionType('[Login Modal] Update Password');
}

export class OpenAction implements Action {
  type = ActionTypes.OPEN;

  constructor(
    public payload?: { showJoinGroup: boolean },
  ) { }
}

export class CloseAction implements Action {
  type = ActionTypes.CLOSE;
}

export class UpdateEmailAction implements Action {
  type = ActionTypes.UPDATE_EMAIL;

  constructor(
    public payload: string,
  ) { }
}

export class UpdatePasswordAction implements Action {
  type = ActionTypes.UPDATE_PASSWORD;

  constructor(
    public payload: string,
  ) { }
}

export type Actions
  = OpenAction
  | CloseAction
  | UpdateEmailAction
  | UpdatePasswordAction
  ;
