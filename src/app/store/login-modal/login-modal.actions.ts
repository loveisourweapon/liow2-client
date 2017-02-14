import { Action } from '@ngrx/store';

import { actionType } from '../utils';

export class ActionTypes {
  static readonly CLOSE = actionType('[Login Modal] Close');
  static readonly OPEN = actionType('[Login Modal] Open');
  static readonly UPDATE_JOIN_GROUP = actionType('[Login Modal] Update Join Group');
  static readonly UPDATE_EMAIL = actionType('[Login Modal] Update Email');
  static readonly UPDATE_PASSWORD = actionType('[Login Modal] Update Password');
}

export class CloseAction implements Action {
  type = ActionTypes.CLOSE;
}

export class OpenAction implements Action {
  type = ActionTypes.OPEN;
}

export class UpdateJoinGroupAction implements Action {
  type = ActionTypes.UPDATE_JOIN_GROUP;

  constructor(
    public payload: boolean,
  ) { }
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
  = CloseAction
  | OpenAction
  | UpdateJoinGroupAction
  | UpdateEmailAction
  | UpdatePasswordAction
  ;
