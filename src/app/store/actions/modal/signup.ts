import { Action } from '@ngrx/store';

import { actionType } from '../../utils';

export class ActionTypes {
  static readonly OPEN = actionType('[Signup Modal] Open');
  static readonly CLOSE = actionType('[Signup Modal] Close');
  static readonly UPDATE_FIRST_NAME = actionType('[Signup Modal] Update First Name');
  static readonly UPDATE_LAST_NAME = actionType('[Signup Modal] Update Last Name');
  static readonly UPDATE_EMAIL = actionType('[Signup Modal] Update Email');
  static readonly UPDATE_PASSWORD = actionType('[Signup Modal] Update Password');
  static readonly UPDATE_PICTURE = actionType('[Signup Modal] Update Picture');
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

export class UpdatePictureAction implements Action {
  type = ActionTypes.UPDATE_PICTURE;

  constructor(
    public payload: string,
  ) { }
}

export type Actions
  = OpenAction
  | CloseAction
  | UpdateFirstNameAction
  | UpdateLastNameAction
  | UpdateEmailAction
  | UpdatePasswordAction
  | UpdatePictureAction
  ;
