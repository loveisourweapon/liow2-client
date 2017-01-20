import { Action } from '@ngrx/store';

export class AuthActionTypes {
  static readonly LOGIN = '[Auth] Login';
  static readonly LOGOUT = '[Auth] Logout';
}

export class LoginAction implements Action {
  type = AuthActionTypes.LOGIN;
}

export class LogoutAction implements Action {
  type = AuthActionTypes.LOGOUT;
}

export type AuthActions
  = LoginAction
  | LogoutAction;
