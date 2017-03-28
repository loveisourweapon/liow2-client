import { assign } from 'lodash';

import * as changePasswordModal from './change-password.actions';
import * as auth from '../../auth/auth.actions';
import { User } from '../../user';

export interface State {
  isOpen: boolean;
  isSaving: boolean;
  user: User;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  errorMessage: string;
}

export const initialState: State = {
  isOpen: false,
  isSaving: false,
  user: null,
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  errorMessage: '',
};

export function reducer(state = initialState, action: auth.Actions|changePasswordModal.Actions): State {
  switch (action.type) {
    case changePasswordModal.ActionTypes.CLOSE:
      return assign({}, state, {
        isOpen: false,
        user: null,
      });

    case changePasswordModal.ActionTypes.OPEN:
      return assign({}, initialState, {
        isOpen: true,
        user: action.payload,
      });

    case changePasswordModal.ActionTypes.UPDATE_CURRENT_PASSWORD:
      return assign({}, state, {
        currentPassword: action.payload,
      });

    case changePasswordModal.ActionTypes.UPDATE_NEW_PASSWORD:
      return assign({}, state, {
        newPassword: action.payload,
      });

    case changePasswordModal.ActionTypes.UPDATE_CONFIRM_PASSWORD:
      return assign({}, state, {
        confirmPassword: action.payload,
      });

    case auth.ActionTypes.CHANGE_PASSWORD:
      return assign({}, state, {
        isSaving: true,
        errorMessage: '',
      });

    case auth.ActionTypes.CHANGE_PASSWORD_FAIL:
      return assign({}, state, {
        isSaving: false,
        errorMessage: action.payload.message,
      });

    case auth.ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return assign({}, state, {
        isOpen: false,
        isSaving: false,
        user: null,
      });

    default:
      return state;
  }
}
