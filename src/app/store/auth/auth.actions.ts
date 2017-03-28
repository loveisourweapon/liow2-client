import { Action } from '@ngrx/store';

import { actionType, ApiError } from '../utils';
import { Credentials } from './index';
import { Group } from '../group';
import { ChangePasswordRequest } from '../modal/change-password';
import { ResetPasswordRequest } from '../reset-password';
import { NewUser, User } from '../user';

export class ActionTypes {
  static readonly CHANGE_PASSWORD = actionType('[Auth] Cahnge Password');
  static readonly CHANGE_PASSWORD_SUCCESS = actionType('[Auth] Change Password Success');
  static readonly CHANGE_PASSWORD_FAIL = actionType('[Auth] Change Password Fail');
  static readonly CONFIRM_EMAIL = actionType('[Auth] Confirm Email');
  static readonly LOGIN_WITH_EMAIL = actionType('[Auth] Login Email');
  static readonly LOGIN_WITH_FACEBOOK = actionType('[Auth] Login Facebook');
  static readonly LOGIN_WITH_TOKEN = actionType('[Auth] Login Token');
  static readonly LOGIN_SUCCESS = actionType('[Auth] Login Success');
  static readonly LOGIN_FAIL = actionType('[Auth] Login Fail');
  static readonly LOGOUT = actionType('[Auth] Logout');
  static readonly LOGOUT_SUCCESS = actionType('[Auth] Logout Success');
  static readonly RESET_PASSWORD = actionType('[Auth] Reset Password');
  static readonly RESET_PASSWORD_DONE = actionType('[Auth] Reset Password Done');
  static readonly SEND_CONFIRM_EMAIL = actionType('[Auth] Send Confirm Email');
  static readonly SEND_CONFIRM_EMAIL_DONE = actionType('[Auth] Send Confirm Email Done');
  static readonly SEND_FORGOT_PASSWORD = actionType('[Auth] Send Forgot Password');
  static readonly SEND_FORGOT_PASSWORD_SUCCESS = actionType('[Auth] Send Forgot Password Success');
  static readonly SEND_FORGOT_PASSWORD_FAIL = actionType('[Auth] Send Forgot Password Fail');
  static readonly SET_CURRENT_GROUP = actionType('[Auth] Set Current Group');
  static readonly SIGNUP = actionType('[Auth] Signup');
  static readonly SIGNUP_SUCCESS = actionType('[Auth] Signup Success');
  static readonly SIGNUP_FAIL = actionType('[Auth] Signup Fail');
}

export class ChangePasswordAction implements Action {
  type = ActionTypes.CHANGE_PASSWORD;

  constructor(
    public payload: ChangePasswordRequest,
  ) { }
}
export class ChangePasswordSuccessAction implements Action {
  type = ActionTypes.CHANGE_PASSWORD_SUCCESS;
  payload = null;
}
export class ChangePasswordFailAction implements Action {
  type = ActionTypes.CHANGE_PASSWORD_FAIL;

  constructor(
    public payload: ApiError,
  ) { }
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
  payload = null;
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
  payload = null;
}
export class LogoutSuccessAction implements Action {
  type = ActionTypes.LOGOUT_SUCCESS;
  payload = null;
}

export class ResetPasswordAction implements Action {
  type = ActionTypes.RESET_PASSWORD;

  constructor(
    public payload: ResetPasswordRequest,
  ) { }
}
export class ResetPasswordDoneAction implements Action {
  type = ActionTypes.RESET_PASSWORD_DONE;
  payload = null;
}

export class SendConfirmEmailAction implements Action {
  type = ActionTypes.SEND_CONFIRM_EMAIL;

  constructor(
    public payload: string,
  ) { }
}
export class SendConfirmEmailDoneAction implements Action {
  type = ActionTypes.SEND_CONFIRM_EMAIL_DONE;
  payload = null;
}

export class SendForgotPasswordAction implements Action {
  type = ActionTypes.SEND_FORGOT_PASSWORD;

  constructor(
    public payload: string,
  ) { }
}
export class SendForgotPasswordSuccessAction implements Action {
  type = ActionTypes.SEND_FORGOT_PASSWORD_SUCCESS;
  payload = null;
}
export class SendForgotPasswordFailAction implements Action {
  type = ActionTypes.SEND_FORGOT_PASSWORD_FAIL;
  payload = null;
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
  payload = null;
}
export class SignupFailAction implements Action {
  type = ActionTypes.SIGNUP_FAIL;

  constructor(
    public payload: ApiError,
  ) { }
}

export type Actions
  = ChangePasswordAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailAction
  | ConfirmEmailAction
  | LoginWithEmailAction
  | LoginWithFacebookAction
  | LoginWithTokenAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | LogoutSuccessAction
  | ResetPasswordAction
  | ResetPasswordDoneAction
  | SendConfirmEmailAction
  | SendConfirmEmailDoneAction
  | SendForgotPasswordAction
  | SendForgotPasswordFailAction
  | SendForgotPasswordSuccessAction
  | SetCurrentGroupAction
  | SignupAction
  | SignupSuccessAction
  | SignupFailAction
  ;
