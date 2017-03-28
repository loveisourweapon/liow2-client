import { Action } from '@ngrx/store';

import { actionType } from '../../utils';
import { User } from '../../user';

export class ActionTypes {
  static readonly CLOSE = actionType('[Change Password Modal] Close');
  static readonly OPEN = actionType('[Change Password Modal] Open');
  static readonly UPDATE_CURRENT_PASSWORD = actionType('[Change Password Modal] Update Current Password');
  static readonly UPDATE_NEW_PASSWORD = actionType('[Change Password Modal] Update New Password');
  static readonly UPDATE_CONFIRM_PASSWORD = actionType('[Change Password Modal] Update Confirm Password');
}

export class CloseAction implements Action {
  type = ActionTypes.CLOSE;
  payload = null;
}

export class OpenAction implements Action {
  type = ActionTypes.OPEN;

  constructor(
    public payload: User,
  ) { }
}

export class UpdateCurrentPasswordAction implements Action {
  type = ActionTypes.UPDATE_CURRENT_PASSWORD;

  constructor(
    public payload: string,
  ) { }
}

export class UpdateNewPasswordAction implements Action {
  type = ActionTypes.UPDATE_NEW_PASSWORD;

  constructor(
    public payload: string,
  ) { }
}

export class UpdateConfirmPasswordAction implements Action {
  type = ActionTypes.UPDATE_CONFIRM_PASSWORD;

  constructor(
    public payload: string,
  ) { }
}

export type Actions
  = CloseAction
  | OpenAction
  | UpdateCurrentPasswordAction
  | UpdateNewPasswordAction
  | UpdateConfirmPasswordAction
  ;
