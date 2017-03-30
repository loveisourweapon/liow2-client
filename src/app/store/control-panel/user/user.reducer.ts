import { assign } from 'lodash';

import { User } from '../../user';
import * as userControlPanel from './user.actions';
import * as auth from '../../auth';

export interface State {
  isEditingName: boolean;
  isSendingConfirmEmail: boolean;
  user: User;
  firstName: string;
  lastName: string;
}

export const initialState: State = {
  isEditingName: false,
  isSendingConfirmEmail: false,
  user: null,
  firstName: '',
  lastName: '',
};

export function reducer(state = initialState, action: userControlPanel.Actions|auth.Actions): State {
  switch (action.type) {
    case userControlPanel.ActionTypes.SET_IS_EDITING:
      const isEditingName = action.payload.isEditingName;
      const currentUser = action.payload.user;
      return assign({}, state, {
        isEditingName,
        firstName: isEditingName ? currentUser.firstName : '',
        lastName: isEditingName ? currentUser.lastName : '',
      });

    case userControlPanel.ActionTypes.SET_USER:
      return assign({}, state, {
        user: action.payload,
      });

    case userControlPanel.ActionTypes.UPDATE_FIRST_NAME:
      return assign({}, state, {
        firstName: action.payload,
      });

    case userControlPanel.ActionTypes.UPDATE_LAST_NAME:
      return assign({}, state, {
        lastName: action.payload,
      });

    case auth.ActionTypes.SEND_CONFIRM_EMAIL:
      return assign({}, state, {
        isSendingConfirmEmail: true,
      });

    case auth.ActionTypes.SEND_CONFIRM_EMAIL_DONE:
      return assign({}, state, {
        isSendingConfirmEmail: false,
      });

    default:
      return state;
  }
}
