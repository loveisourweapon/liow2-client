import { assign, has, keys, merge } from 'lodash';

import * as signupModal from './signup-modal.actions';
import * as auth from '../auth/auth.actions';
import { NewUser } from '../user';

export interface State {
  isOpen: boolean;
  isSigningUp: boolean;
  user: NewUser;
  joinGroup: boolean;
  errorMessage: string;
  errors: { [key: string]: any };
}

export const initialState: State = {
  isOpen: false,
  isSigningUp: false,
  user: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  },
  joinGroup: true,
  errorMessage: '',
  errors: {},
};

export function reducer(state = initialState, action: signupModal.Actions|auth.Actions): State {
  switch (action.type) {
    case signupModal.ActionTypes.CLOSE:
      return assign({}, state, {
        isOpen: false,
      });

    case signupModal.ActionTypes.OPEN:
      return assign({}, initialState, {
        isOpen: true,
      });

    case signupModal.ActionTypes.UPDATE_JOIN_GROUP:
      return assign({}, state, {
        joinGroup: action.payload,
      });

    case signupModal.ActionTypes.UPDATE_EMAIL:
      return merge({}, state, {
        user: {
          email: action.payload,
        },
      });

    case signupModal.ActionTypes.UPDATE_FIRST_NAME:
      return merge({}, state, {
        user: {
          firstName: action.payload,
        },
      });

    case signupModal.ActionTypes.UPDATE_LAST_NAME:
      return merge({}, state, {
        user: {
          lastName: action.payload,
        },
      });

    case signupModal.ActionTypes.UPDATE_PASSWORD:
      return merge({}, state, {
        user: {
          password: action.payload,
        },
      });

    case signupModal.ActionTypes.UPDATE_PICTURE:
      return merge({}, state, {
        user: {
          picture: action.payload,
        },
      });

    case auth.ActionTypes.SIGNUP:
    case auth.ActionTypes.LOGIN_WITH_FACEBOOK:
      return assign({}, state, {
        isSigningUp: true,
        errorMessage: '',
        errors: {},
      });

    case auth.ActionTypes.SIGNUP_SUCCESS:
    case auth.ActionTypes.LOGIN_SUCCESS:
      return assign({}, state, {
        isOpen: false,
        isSigningUp: false,
      });

    case auth.ActionTypes.SIGNUP_FAIL:
      const newProps = <State>{ isSigningUp: false };
      if (has(action.payload, 'errors') && keys(action.payload.errors).length) {
        newProps.errors = action.payload.errors;
      } else {
        newProps.errorMessage = action.payload.message;
      }

      return assign({}, state, newProps);

    default:
      return state;
  }
}
