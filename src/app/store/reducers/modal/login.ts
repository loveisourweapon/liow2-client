import { Credentials } from '../../models';
import * as loginModal from '../../actions/modal/login';

export interface State {
  isOpen: boolean;
  isLoggingIn: boolean;
  credentials: Credentials;
  joinGroup: boolean;
  showJoinGroup: boolean;
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
};

export function reducer(state = initialState, action: loginModal.Actions): State {
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
      return Object.assign({}, state, { credentials: updatedEmail });

    case loginModal.ActionTypes.UPDATE_PASSWORD:
      const updatedPassword = Object.assign({}, state.credentials, {
        password: action.payload,
      });
      return Object.assign({}, state, { credentials: updatedPassword });

    default:
      return state;
  }
}
