import { assign } from 'lodash';

import * as resetPassword from './reset-password.actions';
import * as auth from '../auth/auth.actions';

export interface State {
  isSaving: boolean;
  password: string;
  confirmPassword: string;
  token: string;
}

const initialState: State = {
  isSaving: false,
  password: '',
  confirmPassword: '',
  token: '',
};

export function reducer(state = initialState, action: resetPassword.Actions|auth.Actions): State {
  switch (action.type) {
    case resetPassword.ActionTypes.INITIALISE:
      return assign({}, initialState);

    case resetPassword.ActionTypes.UPDATE_PASSWORD:
      return assign({}, state, {
        password: action.payload,
      });

    case resetPassword.ActionTypes.UPDATE_CONFIRM_PASSWORD:
      return assign({}, state, {
        confirmPassword: action.payload,
      });

    case resetPassword.ActionTypes.UPDATE_TOKEN:
      return assign({}, state, {
        token: action.payload,
      });

    case auth.ActionTypes.RESET_PASSWORD:
      return assign({}, state, {
        isSaving: true,
      });

    case auth.ActionTypes.RESET_PASSWORD_DONE:
      return assign({}, state, {
        isSaving: false,
      });

    default:
      return state;
  }
}
