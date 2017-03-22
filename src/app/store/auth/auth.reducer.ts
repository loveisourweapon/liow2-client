import { assign } from 'lodash';

import * as auth from './auth.actions';
import { Group } from '../group';
import { User } from '../user';

export interface State {
  isAuthenticated: boolean|null;
  user: User|null;
  group: Group|null;
}

export const initialState: State = {
  isAuthenticated: null,
  user: null,
  group: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.ActionTypes.LOGIN_SUCCESS:
      const user = action.payload;
      const group = (!state.group && user.groups.length)
        ? user.groups[0]
        : state.group
        ;

      return {
        isAuthenticated: true,
        user,
        group,
      };

    case auth.ActionTypes.LOGIN_FAIL:
    case auth.ActionTypes.LOGOUT_SUCCESS:
      return assign({}, initialState, {
        isAuthenticated: false,
      });

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
