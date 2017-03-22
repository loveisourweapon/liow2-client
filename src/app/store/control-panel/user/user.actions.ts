import { Action } from '@ngrx/store';

import { actionType } from '../../utils';
import { User } from '../../user';

export class ActionTypes {
  static readonly SAVE_USER_NAME = actionType('[User Control Panel] Save User Name');
  static readonly SET_IS_EDITING = actionType('[User Control Panel] Set Is Editing');
  static readonly SET_USER = actionType('[User Control Panel] Set User');
  static readonly UPDATE_FIRST_NAME = actionType('[User Control Panel] Update First Name');
  static readonly UPDATE_LAST_NAME = actionType('[User Control Panel] Update Last Name');
}

export class SaveUserNameAction implements Action {
  type = ActionTypes.SAVE_USER_NAME;

  constructor(
    public payload: { user: User, firstName: string, lastName: string },
  ) { }
}

export class SetIsEditingAction implements Action {
  type = ActionTypes.SET_IS_EDITING;

  constructor(
    public payload: { isEditingName: boolean, user: User },
  ) { }
}

export class SetUserAction implements Action {
  type = ActionTypes.SET_USER;

  constructor(
    public payload: User,
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

export type Actions
  = SaveUserNameAction
  | SetIsEditingAction
  | SetUserAction
  | UpdateFirstNameAction
  | UpdateLastNameAction
  ;
