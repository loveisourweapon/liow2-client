import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { Credentials } from './index';
import { Group } from '../group';
import { NewUser, User } from '../user';

export class ActionTypes {
  static readonly CONFIRM_EMAIL = actionType('[Auth] Confirm Email');
  static readonly LOGIN_WITH_EMAIL = actionType('[Auth] Login Email');
  static readonly LOGIN_WITH_FACEBOOK = actionType('[Auth] Login Facebook');
  static readonly LOGIN_WITH_TOKEN = actionType('[Auth] Login Token');
  static readonly LOGIN_SUCCESS = actionType('[Auth] Login Success');
  static readonly LOGIN_FAIL = actionType('[Auth] Login Fail');
  static readonly LOGOUT = actionType('[Auth] Logout');
  static readonly LOGOUT_SUCCESS = actionType('[Auth] Logout Success');
  static readonly SEND_CONFIRM_EMAIL = actionType('[Auth] Send Confirm Email');
  static readonly SEND_CONFIRM_EMAIL_DONE = actionType('[Auth] Send Confirm Email Done');
  static readonly SET_CURRENT_GROUP = actionType('[Auth] Set Current Group');
  static readonly SIGNUP = actionType('[Auth] Signup');
  static readonly SIGNUP_SUCCESS = actionType('[Auth] Signup Success');
  static readonly SIGNUP_FAIL = actionType('[Auth] Signup Fail');
}

export class ConfirmEmailAction implements Action {
  type = ActionTypes.CONFIRM_EMAIL;

  constructor(
    public payload: string,
  ) { }
}

export class LoginWithEmailAction implements Action {
  type = ActionTypes.LOGIN_WITH_EMAIL;

  constructor(
    public payload: Credentials,
  ) { }
}
export class LoginWithFacebookAction implements Action {
  type = ActionTypes.LOGIN_WITH_FACEBOOK;

  constructor(
    public payload?: { group: string },
  ) { }
}
export class LoginWithTokenAction implements Action {
  type = ActionTypes.LOGIN_WITH_TOKEN;
}
export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;

  constructor(
    public payload: User,
  ) { }
}
export class LoginFailAction implements Action {
  type = ActionTypes.LOGIN_FAIL;

  constructor(
    public payload: string,
  ) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;
}
export class LogoutSuccessAction implements Action {
  type = ActionTypes.LOGOUT_SUCCESS;
}

export class SendConfirmEmailAction implements Action {
  type = ActionTypes.SEND_CONFIRM_EMAIL;

  constructor(
    public payload: string,
  ) { }
}
export class SendConfirmEmailDoneAction implements Action {
  type = ActionTypes.SEND_CONFIRM_EMAIL_DONE;
}

export class SetCurrentGroupAction implements Action {
  type = ActionTypes.SET_CURRENT_GROUP;

  constructor(
    public payload: Group,
  ) { }
}

export class SignupAction implements Action {
  type = ActionTypes.SIGNUP;

  constructor(
    public payload: NewUser,
  ) { }
}
export class SignupSuccessAction implements Action {
  type = ActionTypes.SIGNUP_SUCCESS;
}
export class SignupFailAction implements Action {
  type = ActionTypes.SIGNUP_FAIL;

  constructor(
    public payload: {
      errors: { [key: string]: any },
      message: string,
    },
  ) { }
}

export type Actions
  = ConfirmEmailAction
  | LoginWithEmailAction
  | LoginWithFacebookAction
  | LoginWithTokenAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | LogoutSuccessAction
  | SendConfirmEmailAction
  | SendConfirmEmailDoneAction
  | SetCurrentGroupAction
  | SignupAction
  | SignupSuccessAction
  | SignupFailAction
  ;
