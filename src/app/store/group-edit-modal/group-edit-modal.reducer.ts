import { assign, has, keys, merge } from 'lodash';

import * as groupEditModal from './group-edit-modal.actions';
import { GroupEditAction } from './group-edit-modal.model';
import * as group from '../group/group.actions';
import { Group, NewGroup } from '../group';
import { User } from '../user';

export interface State {
  action: string;
  isOpen: boolean;
  isSaving: boolean;
  group: Group|NewGroup;
  groupUsers: User[];
  setupCampaign: boolean;
  errorMessage: string;
  errors: { [key: string]: any };
}

export const initialState: State = {
  action: GroupEditAction.Create,
  isOpen: false,
  isSaving: false,
  group: {
    name: '',
    logo: null,
    coverImage: null,
    admins: [],
    welcomeMessage: '',
  },
  groupUsers: [],
  setupCampaign: true,
  errorMessage: '',
  errors: {},
};

export function reducer(state = initialState, action: groupEditModal.Actions|group.Actions): State {
  switch (action.type) {
    case groupEditModal.ActionTypes.CLOSE:
      return assign({}, state, {
        isOpen: false,
        group: initialState.group, // Always reset group when closing
      });

    case groupEditModal.ActionTypes.OPEN:
      return assign({}, initialState, {
        isOpen: true,
        action: action.payload.action,
        group: action.payload.group || initialState.group,
        setupCampaign: !action.payload.group,
      });

    case groupEditModal.ActionTypes.UPDATE_GROUP_USERS:
      return assign({}, state, {
        groupUsers: action.payload,
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

    case groupEditModal.ActionTypes.UPDATE_ADMINS:
      return assign({}, state, {
        group: assign({}, state.group, {
          admins: action.payload,
        }),
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
    case group.ActionTypes.UPDATE:
      return assign({}, state, {
        isSaving: true,
        errorMessage: '',
        errors: {},
      });

    case group.ActionTypes.CREATE_FAIL:
    case group.ActionTypes.UPDATE_FAIL:
      const newProps = <State>{ isSaving: false };
      if (has(action.payload, 'errors') && keys(action.payload.errors).length) {
        newProps.errors = action.payload.errors;
      } else {
        newProps.errorMessage = action.payload.message;
      }

      return assign({}, state, newProps);

    case group.ActionTypes.CREATE_SUCCESS:
    case group.ActionTypes.UPDATE_SUCCESS:
      return assign({}, state, {
        isOpen: false,
        isSaving: false,
        group: initialState.group, // Always reset group when closing
      });

    default:
      return state;
  }
}
