import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { SearchItem } from './index';

export class ActionTypes {
  static readonly SET_IS_MENU_OPEN = actionType('[Layout] Set is Menu Open');
  static readonly SET_IS_SMALL_SCREEN = actionType('[Layout] Set is Small Screen');
  static readonly UPDATE_SEARCH_INPUT = actionType('[Layout] Update Search Input');
  static readonly UPDATE_SEARCH_RESULTS = actionType('[Layout] Update Search Results');
}

export class SetIsMenuOpenAction implements Action {
  type = ActionTypes.SET_IS_MENU_OPEN;

  constructor(
    public payload: boolean,
  ) { }
}

export class SetIsSmallScreenAction implements Action {
  type = ActionTypes.SET_IS_SMALL_SCREEN;

  constructor(
    public payload: boolean,
  ) { }
}

export class UpdateSearchInputAction implements Action {
  type = ActionTypes.UPDATE_SEARCH_INPUT;

  constructor(
    public payload: string,
  ) { }
}

export class UpdateSearchResultsAction implements Action {
  type = ActionTypes.UPDATE_SEARCH_RESULTS;

  constructor(
    public payload: SearchItem[],
  ) { }
}

export type Actions
  = SetIsMenuOpenAction
  | SetIsSmallScreenAction
  | UpdateSearchInputAction
  | UpdateSearchResultsAction
  ;
