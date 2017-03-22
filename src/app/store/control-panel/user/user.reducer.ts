import { assign } from 'lodash';

import { User } from '../../user';
import * as user from './user.actions';

export interface State {
  isEditingName: boolean;
  user: User;
  firstName: string;
  lastName: string;
}

export const initialState: State = {
  isEditingName: false,
  user: null,
  firstName: '',
  lastName: '',
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.ActionTypes.SET_IS_EDITING:
      const isEditingName = action.payload.isEditingName;
      const currentUser = action.payload.user;
      return assign({}, state, {
        isEditingName,
        firstName: isEditingName ? currentUser.firstName : '',
        lastName: isEditingName ? currentUser.lastName : '',
      });

    case user.ActionTypes.SET_USER:
      return assign({}, state, {
        user: action.payload,
      });

    case user.ActionTypes.UPDATE_FIRST_NAME:
      return assign({}, state, {
        firstName: action.payload,
      });

    case user.ActionTypes.UPDATE_LAST_NAME:
      return assign({}, state, {
        lastName: action.payload,
      });

    default:
      return state;
  }
}
