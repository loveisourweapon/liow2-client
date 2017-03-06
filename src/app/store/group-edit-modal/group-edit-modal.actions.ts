import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { GroupEditAction, GroupEditInitialise } from './index';
import { User } from '../user';

export class ActionTypes {
  static readonly CLOSE = actionType('[Group Edit Modal] Close');
  static readonly OPEN = actionType('[Group Edit Modal] Open');
  static readonly UPDATE_GROUP_USERS = actionType('[Group Edit Modal] Update Group Users');
  static readonly UPDATE_NAME = actionType('[Group Edit Modal] Update Name');
  static readonly UPDATE_LOGO = actionType('[Group Edit Modal] Update Logo');
  static readonly UPDATE_COVER_IMAGE = actionType('[Group Edit Modal] Update Cover Image');
  static readonly UPDATE_ADMINS = actionType('[Group Edit Modal] Update Admins');
  static readonly UPDATE_WELCOME_MESSAGE = actionType('[Group Edit Modal] Update Welcome Message');
  static readonly UPDATE_SETUP_CAMPAIGN = actionType('[Group Edit Modal] Update Setup Campaign');
}

export class CloseAction implements Action {
  type = ActionTypes.CLOSE;
}

export class OpenAction implements Action {
  type = ActionTypes.OPEN;

  constructor(
    public payload: GroupEditInitialise = { action: GroupEditAction.CREATE },
  ) { }
}

export class UpdateGroupUsersAction implements Action {
  type = ActionTypes.UPDATE_GROUP_USERS;

  constructor(
    public payload: User[],
  ) { }
}

export class UpdateNameAction implements Action {
  type = ActionTypes.UPDATE_NAME;

  constructor(
    public payload: string,
  ) { }
}

export class UpdateLogoAction implements Action {
  type = ActionTypes.UPDATE_LOGO;

  constructor(
    public payload: string,
  ) { }
}

export class UpdateCoverImageAction implements Action {
  type = ActionTypes.UPDATE_COVER_IMAGE;

  constructor(
    public payload: string,
  ) { }
}

export class UpdateAdminsAction implements Action {
  type = ActionTypes.UPDATE_ADMINS;

  constructor(
    public payload: string[],
  ) { }
}

export class UpdateWelcomeMessageAction implements Action {
  type = ActionTypes.UPDATE_WELCOME_MESSAGE;

  constructor(
    public payload: string,
  ) { }
}

export class UpdateSetupCampaignAction implements Action {
  type = ActionTypes.UPDATE_SETUP_CAMPAIGN;

  constructor(
    public payload: boolean,
  ) { }
}

export type Actions
  = CloseAction
  | OpenAction
  | UpdateGroupUsersAction
  | UpdateNameAction
  | UpdateLogoAction
  | UpdateCoverImageAction
  | UpdateAdminsAction
  | UpdateWelcomeMessageAction
  | UpdateSetupCampaignAction
  ;