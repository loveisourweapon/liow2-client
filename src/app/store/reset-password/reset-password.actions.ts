import { Action } from '@ngrx/store';

import { actionType } from '../utils';

export class ActionTypes {
  static readonly INITIALISE = actionType('[Reset Password] Initialise');
  static readonly UPDATE_PASSWORD = actionType('[Reset Password] Update Password');
  static readonly UPDATE_CONFIRM_PASSWORD = actionType('[Reset Password] Update Confirm Password');
  static readonly UPDATE_TOKEN = actionType('[Reset Password] Update Token');
}

export class InitialiseAction implements Action {
  type = ActionTypes.INITIALISE;
}

export class UpdatePasswordAction implements Action {
  type = ActionTypes.UPDATE_PASSWORD;

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

export class UpdateTokenAction implements Action {
  type = ActionTypes.UPDATE_TOKEN;

  constructor(
    public payload: string,
  ) { }
}


export type Actions
  = InitialiseAction
  | UpdatePasswordAction
  | UpdateConfirmPasswordAction
  | UpdateTokenAction
  ;
