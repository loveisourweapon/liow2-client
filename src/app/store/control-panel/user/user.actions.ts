import { Action } from '@ngrx/store';

import { actionType } from '../../utils';
import { User } from '../../user';

export class ActionTypes {
  static readonly SET_USER = actionType('[User Control Panel] Set User');
}

export class SetUserAction implements Action {
  type = ActionTypes.SET_USER;

  constructor(
    public payload: User,
  ) { }
}

export type Actions
  = SetUserAction
  ;
