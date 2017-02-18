import { assign, merge } from 'lodash';

import * as loginModal from './login-modal.actions';
import { Credentials } from '../auth';
import * as auth from '../auth/auth.actions';

export interface State {
  isOpen: boolean;
  isLoggingIn: boolean;
  isSendingConfirmEmail: boolean;
  credentials: Credentials;
  joinGroup: boolean;
  errorMessage: string;
}

const initialState: State = {
  isOpen: false,
  isLoggingIn: false,
  isSendingConfirmEmail: false,
  credentials: {
    email: '',
    password: '',
  },
  joinGroup: true,
  errorMessage: '',
};

export function reducer(state = initialState, action: loginModal.Actions|auth.Actions): State {
  switch (action.type) {
    case loginModal.ActionTypes.CLOSE:
      return assign({}, state, {
        isOpen: false,
      });

    case loginModal.ActionTypes.OPEN:
      return assign({}, initialState, {
        isOpen: true,
      });

    case loginModal.ActionTypes.UPDATE_JOIN_GROUP:
      return assign({}, state, {
        joinGroup: action.payload,
      });

    case loginModal.ActionTypes.UPDATE_EMAIL:
      return merge({}, state, {
        credentials: {
          email: action.payload,
        },
      });

    case loginModal.ActionTypes.UPDATE_PASSWORD:
      return merge({}, state, {
        credentials: {
          password: action.payload,
        },
      });

    case auth.ActionTypes.LOGIN_WITH_EMAIL:
    case auth.ActionTypes.LOGIN_WITH_FACEBOOK:
      return assign({}, state, {
        isLoggingIn: true,
        errorMessage: '',
      });

    case auth.ActionTypes.LOGIN_SUCCESS:
      return assign({}, state, {
        isOpen: false,
        isLoggingIn: false,
      });

    case auth.ActionTypes.LOGIN_FAIL:
      return assign({}, state, {
        isLoggingIn: false,
        errorMessage: action.payload,
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
