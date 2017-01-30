import * as auth from '../actions/auth';

export interface State {
  isAuthenticated: boolean;
  user: any|null;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.ActionTypes.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.payload,
      };

    case auth.ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}

export function getIsAuthenticated(state: State) { return state.isAuthenticated; }
export function getUser(state: State) { return state.user; }
