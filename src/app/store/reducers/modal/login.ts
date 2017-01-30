import { Credentials } from '../../models';
import * as auth from '../../actions/auth';
import * as loginModal from '../../actions/modal/login';

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
      return Object.assign({}, initialState, {
        isOpen: true,
        joinGroup: showJoinGroup,
        showJoinGroup: showJoinGroup,
      });

    case loginModal.ActionTypes.CLOSE:
      return Object.assign({}, state, {
        isOpen: false,
      });

    case loginModal.ActionTypes.UPDATE_EMAIL:
      const updatedEmail = Object.assign({}, state.credentials, {
        email: action.payload,
      });
      return Object.assign({}, state, {
        credentials: updatedEmail,
      });

    case loginModal.ActionTypes.UPDATE_PASSWORD:
      const updatedPassword = Object.assign({}, state.credentials, {
        password: action.payload,
      });
      return Object.assign({}, state, {
        credentials: updatedPassword,
      });

    case auth.ActionTypes.LOGIN_WITH_EMAIL:
    case auth.ActionTypes.LOGIN_WITH_FACEBOOK:
      return Object.assign({}, state, {
        isLoggingIn: true,
        errorMessage: '',
      });

    case auth.ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isOpen: false,
        isLoggingIn: false,
      });

    case auth.ActionTypes.LOGIN_FAIL:
      return Object.assign({}, state, {
        isLoggingIn: false,
        errorMessage: action.payload,
      });

    default:
      return state;
  }
}
