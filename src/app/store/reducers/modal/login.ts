import { Credentials } from '../../models';
import * as auth from '../../actions/auth';
import * as loginModal from '../../actions/modal/login';
import { assign, merge } from 'lodash';

export interface State {
  isOpen: boolean;
  isLoggingIn: boolean;
  credentials: Credentials;
  joinGroup: boolean;
  showJoinGroup: boolean;
  errorMessage: string;
}

const initialState: State = {
  isOpen: false,
  isLoggingIn: false,
  credentials: {
    email: '',
    password: '',
  },
  joinGroup: false,
  showJoinGroup: false,
  errorMessage: '',
};

export function reducer(state = initialState, action: loginModal.Actions|auth.Actions): State {
  switch (action.type) {
    case loginModal.ActionTypes.OPEN:
      const showJoinGroup = action.payload != null
        ? action.payload.showJoinGroup
        : initialState.showJoinGroup
        ;
      return assign({}, initialState, {
        isOpen: true,
        joinGroup: showJoinGroup,
        showJoinGroup: showJoinGroup,
      });

    case loginModal.ActionTypes.CLOSE:
      return assign({}, state, {
        isOpen: false,
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

    default:
      return state;
  }
}
