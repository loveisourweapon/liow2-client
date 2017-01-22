import { Action } from '@ngrx/store';

import { actionType } from '../utils';

export class ActionTypes {
  static readonly LOGIN = actionType('[Auth] Login');
  static readonly LOGOUT = actionType('[Auth] Logout');
}

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;
}

export type Actions
  = LoginAction
  | LogoutAction
  ;
