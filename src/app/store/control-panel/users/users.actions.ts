import { Action } from '@ngrx/store';

import { actionType, ApiError } from '../../utils';
import * as fromUsersControlPanel from './users.reducer';
import { User } from '../../user';

export class ActionTypes {
  static readonly LOAD_USERS = actionType('[Users Control Panel] Load Users');
  static readonly LOAD_USERS_FAIL = actionType('[Users Control Panel] Load Users Fail');
  static readonly LOAD_USERS_SUCCESS = actionType('[Users Control Panel] Load Users Success');
  static readonly UPDATE_QUERY = actionType('[Users Control Panel] Update Query');
  static readonly UPDATE_PAGE = actionType('[Users Control Panel] Update Page');
  static readonly UPDATE_NUMBER_OF_PAGES = actionType('[Users Control Panel] Update Number of Pages');
}

export class LoadUsersAction implements Action {
  type = ActionTypes.LOAD_USERS;

  constructor(
    public payload: fromUsersControlPanel.State,
  ) { }
}
export class LoadUsersFailAction implements Action {
  type = ActionTypes.LOAD_USERS_FAIL;

  constructor(
    public payload: ApiError,
  ) { }
}
export class LoadUsersSuccessAction implements Action {
  type = ActionTypes.LOAD_USERS_SUCCESS;

  constructor(
    public payload: { users: User[], numberOfUsers: number },
  ) { }
}

export class UpdateQueryAction implements Action {
  type = ActionTypes.UPDATE_QUERY;

  constructor(
    public payload: string,
  ) { }
}

export class UpdatePageAction implements Action {
  type = ActionTypes.UPDATE_PAGE;

  constructor(
    public payload: number,
  ) { }
}

export class UpdateNumberOfPagesAction implements Action {
  type = ActionTypes.UPDATE_NUMBER_OF_PAGES;

  constructor(
    public payload: number,
  ) { }
}

export type Actions
  = LoadUsersAction
  | LoadUsersFailAction
  | LoadUsersSuccessAction
  | UpdateQueryAction
  | UpdatePageAction
  | UpdateNumberOfPagesAction
  ;
