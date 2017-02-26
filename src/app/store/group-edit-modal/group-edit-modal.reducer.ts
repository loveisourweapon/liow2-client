import { assign, has, keys, merge } from 'lodash';

import * as groupEditModal from './group-edit-modal.actions';
import { GroupEditAction } from './group-edit-modal.model';
import * as group from '../group/group.actions';
import { Group, NewGroup } from '../group';

export interface State {
  action: string;
  isOpen: boolean;
  isSaving: boolean;
  group: Group|NewGroup;
  setupCampaign: boolean;
  errorMessage: string;
  errors: { [key: string]: any };
}

const initialState: State = {
  action: GroupEditAction.CREATE,
  isOpen: false,
  isSaving: false,
  group: {
    name: '',
    logo: null,
    coverImage: null,
    welcomeMessage: '',
  },
  setupCampaign: true,
  errorMessage: '',
  errors: {},
};

export function reducer(state = initialState, action: groupEditModal.Actions|group.Actions): State {
  switch (action.type) {
    case groupEditModal.ActionTypes.CLOSE:
      return assign({}, state, {
        isOpen: false,
      });

    case groupEditModal.ActionTypes.OPEN:
      return assign({}, initialState, {
        isOpen: true,
        action: action.payload.action,
        group: action.payload.group || initialState.action,
        setupCampaign: !action.payload.group,
      });

    case groupEditModal.ActionTypes.UPDATE_NAME:
      return merge({}, state, {
        group: {
          name: action.payload,
        },
      });

    case groupEditModal.ActionTypes.UPDATE_LOGO:
      return merge({}, state, {
        group: {
          logo: action.payload,
        },
      });

    case groupEditModal.ActionTypes.UPDATE_COVER_IMAGE:
      return merge({}, state, {
        group: {
          coverImage: action.payload,
        },
      });

    case groupEditModal.ActionTypes.UPDATE_WELCOME_MESSAGE:
      return merge({}, state, {
        group: {
          welcomeMessage: action.payload,
        },
      });

    case groupEditModal.ActionTypes.UPDATE_SETUP_CAMPAIGN:
      return assign({}, state, {
        setupCampaign: action.payload,
      });

    case group.ActionTypes.CREATE:
      return assign({}, state, {
        isSaving: true,
        errorMessage: '',
        errors: {},
      });

    case group.ActionTypes.CREATE_FAIL:
      const newProps = <State>{ isSaving: false };
      if (has(action.payload, 'errors') && keys(action.payload.errors).length) {
        newProps.errors = action.payload.errors;
      } else {
        newProps.errorMessage = action.payload.message;
      }

      return assign({}, state, newProps);

    case group.ActionTypes.CREATE_SUCCESS:
      return assign({}, state, {
        isOpen: false,
        isSavings: false,
      });

    default:
      return state;
  }
}
