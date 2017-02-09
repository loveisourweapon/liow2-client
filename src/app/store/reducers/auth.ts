import * as auth from '../actions/auth';
import { assign } from 'lodash';

export interface State {
  isAuthenticated: boolean;
  user: any|null;
  group: any|null;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
  group: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.ActionTypes.LOGIN_SUCCESS:
      const user = action.payload;
      const group = user.groups.length ? user.groups[0] : null;

      return {
        isAuthenticated: true,
        user,
        group,
      };

    case auth.ActionTypes.LOGOUT_SUCCESS:
      return assign({}, initialState);

    case auth.ActionTypes.SET_CURRENT_GROUP:
      return assign({}, state, {
        group: action.payload,
      });

    default:
      return state;
  }
}

export function getIsAuthenticated(state: State) { return state.isAuthenticated; }
export function getUser(state: State) { return state.user; }
export function getGroup(state: State) { return state.group; }
