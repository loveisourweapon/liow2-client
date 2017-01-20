import { AuthActions, AuthActionTypes } from '../actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: any|null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      const isAuthenticated = true;
      const user = {};
      return { isAuthenticated, user };

    case AuthActionTypes.LOGOUT:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}
