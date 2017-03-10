import { assign } from 'lodash';

import * as campaignEditModal from './campaign-edit-modal.actions';
import { CampaignEditAction } from './campaign-edit-modal.model';
import * as group from '../group/group.actions';
import { Campaign, DeedPublish, NewCampaign } from '../group';

export interface State {
  action: string;
  isOpen: boolean;
  isSaving: boolean;
  campaign: Campaign|NewCampaign;
  deeds: DeedPublish[];
  errorMessage: string;
}

export const initialState: State = {
  action: CampaignEditAction.Create,
  isOpen: false,
  isSaving: false,
  campaign: {
    group: '',
    deeds: [],
  },
  deeds: [],
  errorMessage: '',
};

export function reducer(state = initialState, action: campaignEditModal.Actions|group.Actions): State {
  switch (action.type) {
    case campaignEditModal.ActionTypes.CLOSE:
      return assign({}, state, {
        isOpen: false,
        campaign: initialState.campaign, // Always reset campaign when closing
      });

    case campaignEditModal.ActionTypes.OPEN:
      const campaign = action.payload.campaign
        ? action.payload.campaign
        : assign({}, initialState.campaign, { group: action.payload.group._id })
        ;

      return assign({}, initialState, {
        isOpen: true,
        action: action.payload.action,
        campaign,
      });

    case campaignEditModal.ActionTypes.UPDATE_DEEDS:
      return assign({}, state, {
        deeds: action.payload,
      });

    case campaignEditModal.ActionTypes.UPDATE_SELECTED_DEEDS:
      return assign({}, state, {
        campaign: assign({}, state.campaign, {
          deeds: action.payload,
        }),
      });

    case group.ActionTypes.CREATE_CAMPAIGN:
      return assign({}, state, {
        isSaving: true,
        errorMessage: '',
      });

    case group.ActionTypes.CREATE_CAMPAIGN_FAIL:
      return assign({}, state, {
        isSaving: false,
        errorMessage: action.payload.message,
      });

    case group.ActionTypes.CREATE_CAMPAIGN_SUCCESS:
      return assign({}, state, {
        isOpen: false,
        isSaving: false,
        campaign: initialState.campaign, // Always reset campaign when closing
      });

    default:
      return state;
  }
}
