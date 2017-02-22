import { Action } from '@ngrx/store';

import { actionType } from '../utils';

export class ActionTypes {
  static readonly CLOSE = actionType('[Forgot Password Modal] Close');
  static readonly OPEN = actionType('[Forgot Password Modal] Open');
  static readonly UPDATE_EMAIL_ADDRESS = actionType('[Forgot Password Modal] Update Email Address');
}

export class CloseAction implements Action {
  type = ActionTypes.CLOSE;
}

export class OpenAction implements Action {
  type = ActionTypes.OPEN;

  constructor(
    public payload = '',
  ) { }
}

export class UpdateEmailAddressAction implements Action {
  type = ActionTypes.UPDATE_EMAIL_ADDRESS;

  constructor(
    public payload: string,
  ) { }
}

export type Actions
  = CloseAction
  | OpenAction
  | UpdateEmailAddressAction
  ;
