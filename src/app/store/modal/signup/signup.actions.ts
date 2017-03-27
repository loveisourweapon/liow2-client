import { Action } from '@ngrx/store';

import { actionType } from '../../utils';

export class ActionTypes {
  static readonly CLOSE = actionType('[Signup Modal] Close');
  static readonly OPEN = actionType('[Signup Modal] Open');
  static readonly UPDATE_JOIN_GROUP = actionType('[Signup Modal] Update Join Group');
  static readonly UPDATE_EMAIL = actionType('[Signup Modal] Update Email');
  static readonly UPDATE_FIRST_NAME = actionType('[Signup Modal] Update First Name');
  static readonly UPDATE_LAST_NAME = actionType('[Signup Modal] Update Last Name');
  static readonly UPDATE_PASSWORD = actionType('[Signup Modal] Update Password');
  static readonly UPDATE_PICTURE = actionType('[Signup Modal] Update Picture');
}

export class CloseAction implements Action {
  type = ActionTypes.CLOSE;
  payload = null;
}

export class OpenAction implements Action {
  type = ActionTypes.OPEN;
  payload = null;
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

export class UpdateFirstNameAction implements Action {
  type = ActionTypes.UPDATE_FIRST_NAME;

  constructor(
    public payload: string,
  ) { }
}

export class UpdateLastNameAction implements Action {
  type = ActionTypes.UPDATE_LAST_NAME;

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

export class UpdatePictureAction implements Action {
  type = ActionTypes.UPDATE_PICTURE;

  constructor(
    public payload: string,
  ) { }
}

export type Actions
  = CloseAction
  | OpenAction
  | UpdateJoinGroupAction
  | UpdateEmailAction
  | UpdateFirstNameAction
  | UpdateLastNameAction
  | UpdatePasswordAction
  | UpdatePictureAction
  ;
