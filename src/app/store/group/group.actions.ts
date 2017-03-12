import { Action } from '@ngrx/store';

import { actionType, ApiError, SearchParams } from '../utils';
import { Campaign, NewCampaign, NewGroup, Group, GroupTab } from './index';
import { Deed } from '../deed';

export class ActionTypes {
  static readonly COUNT = actionType('[Group] Count');
  static readonly COUNT_FAIL = actionType('[Group] Count Fail');
  static readonly COUNT_SUCCESS = actionType('[Group] Count Success');
  static readonly CREATE = actionType('[Group] Create');
  static readonly CREATE_FAIL = actionType('[Group] Create Fail');
  static readonly CREATE_SUCCESS = actionType('[Group] Create Success');
  static readonly CREATE_CAMPAIGN = actionType('[Group] Create Campaign');
  static readonly CREATE_CAMPAIGN_FAIL = actionType('[Group] Create Campaign Fail');
  static readonly CREATE_CAMPAIGN_SUCCESS = actionType('[Group] Create Campaign Success');
  static readonly FIND_AND_SET_CURRENT = actionType('[Group] Find and Set Current');
  static readonly FIND_AND_SET_CURRENT_FAIL = actionType('[Group] Find and Set Current Fail');
  static readonly FIND_AND_SET_CURRENT_CAMPAIGN = actionType('[Group] Find and Set Current Campaign');
  static readonly FIND_AND_SET_CURRENT_CAMPAIGN_FAIL = actionType('[Group] Find and Set Current Campaign Fail');
  static readonly FINISH_CAMPAIGN = actionType('[Group] Finish Campaign');
  static readonly SET_CURRENT = actionType('[Group] Set Current');
  static readonly SET_CURRENT_CAMPAIGN = actionType('[Group] Set Current Campaign');
  static readonly SET_CURRENT_TAB = actionType('[Group] Set Current Tab');
  static readonly SET_DEED_PUBLISHED = actionType('[Group] Set Deed Published');
  static readonly UPDATE = actionType('[Group] Update');
  static readonly UPDATE_FAIL = actionType('[Group] Update Fail');
  static readonly UPDATE_SUCCESS = actionType('[Group] Update Success');
}

export class CountAction implements Action {
  type = ActionTypes.COUNT;
}
export class CountFailAction implements Action {
  type = ActionTypes.COUNT_FAIL;

  constructor(
    public payload: any,
  ) { }
}
export class CountSuccessAction implements Action {
  type = ActionTypes.COUNT_SUCCESS;

  constructor(
    public payload: number,
  ) { }
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(
    public payload: { group: NewGroup, setupCampaign: boolean },
  ) { }
}
export class CreateFailAction implements Action {
  type = ActionTypes.CREATE_FAIL;

  constructor(
    public payload: ApiError,
  ) { }
}
export class CreateSuccessAction implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(
    public payload: Group,
  ) { }
}

export class CreateCampaignAction implements Action {
  type = ActionTypes.CREATE_CAMPAIGN;

  constructor(
    public payload: Campaign|NewCampaign,
  ) { }
}
export class CreateCampaignFailAction implements Action {
  type = ActionTypes.CREATE_CAMPAIGN_FAIL;

  constructor(
    public payload: ApiError,
  ) { }
}
export class CreateCampaignSuccessAction implements Action {
  type = ActionTypes.CREATE_CAMPAIGN_SUCCESS;

  constructor(
    public payload: Campaign,
  ) { }
}

export class FindAndSetCurrentAction implements Action {
  type = ActionTypes.FIND_AND_SET_CURRENT;

  constructor(
    public payload: SearchParams,
  ) { }
}
export class FindAndSetCurrentFailAction implements Action {
  type = ActionTypes.FIND_AND_SET_CURRENT_FAIL;

  constructor(
    public payload: string,
  ) { }
}

export class FindAndSetCurrentCampaignAction implements Action {
  type = ActionTypes.FIND_AND_SET_CURRENT_CAMPAIGN;

  constructor(
    public payload: SearchParams,
  ) { }
}
export class FindAndSetCurrentCampaignFailAction implements Action {
  type = ActionTypes.FIND_AND_SET_CURRENT_CAMPAIGN_FAIL;

  constructor(
    public payload: string,
  ) { }
}

export class FinishCampaignAction implements Action {
  type = ActionTypes.FINISH_CAMPAIGN;

  constructor(
    public payload: Campaign,
  ) { }
}

export class SetCurrentAction implements Action {
  type = ActionTypes.SET_CURRENT;

  constructor(
    public payload: Group,
  ) { }
}

export class SetCurrentCampaignAction implements Action {
  type = ActionTypes.SET_CURRENT_CAMPAIGN;

  constructor(
    public payload?: Campaign,
  ) { }
}

export class SetCurrentTabAction implements Action {
  type = ActionTypes.SET_CURRENT_TAB;

  constructor(
    public payload: GroupTab,
  ) { }
}

export class SetDeedPublishedAction implements Action {
  type = ActionTypes.SET_DEED_PUBLISHED;

  constructor(
    public payload: { campaign: Campaign, deed: Deed, isPublished: boolean },
  ) { }
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(
    public payload: Group,
  ) { }
}
export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;

  constructor(
    public payload: ApiError,
  ) { }
}
export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;

  constructor(
    public payload: Group,
  ) { }
}

export type Actions
  = CountAction
  | CountFailAction
  | CountSuccessAction
  | CreateAction
  | CreateFailAction
  | CreateSuccessAction
  | CreateCampaignAction
  | CreateCampaignFailAction
  | CreateCampaignSuccessAction
  | FindAndSetCurrentAction
  | FindAndSetCurrentFailAction
  | FindAndSetCurrentCampaignAction
  | FindAndSetCurrentCampaignFailAction
  | FinishCampaignAction
  | SetCurrentAction
  | SetCurrentCampaignAction
  | SetCurrentTabAction
  | SetDeedPublishedAction
  | UpdateAction
  | UpdateFailAction
  | UpdateSuccessAction
  ;
