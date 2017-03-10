import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { CampaignEditInitialise } from './index';
import { DeedPublish } from '../group';

export class ActionTypes {
  static readonly CLOSE = actionType('[Campaign Edit Modal] Close');
  static readonly OPEN = actionType('[Campaign Edit Modal] Open');
  static readonly UPDATE_DEEDS = actionType('[Campaign Edit Modal] Update Deeds');
  static readonly UPDATE_SELECTED_DEEDS = actionType('[Campaign Edit Modal] Update Selected Deeds');
}

export class CloseAction implements Action {
  type = ActionTypes.CLOSE;
}

export class OpenAction implements Action {
  type = ActionTypes.OPEN;

  constructor(
    public payload: CampaignEditInitialise,
  ) { }
}

export class UpdateDeedsAction implements Action {
  type = ActionTypes.UPDATE_DEEDS;

  constructor(
    public payload: DeedPublish[],
  ) { }
}

export class UpdateSelectedDeedsAction implements Action {
  type = ActionTypes.UPDATE_SELECTED_DEEDS;

  constructor(
    public payload: DeedPublish[],
  ) { }
}

export type Actions
  = CloseAction
  | OpenAction
  | UpdateDeedsAction
  | UpdateSelectedDeedsAction
  ;
