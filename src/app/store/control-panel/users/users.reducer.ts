import { assign } from 'lodash';

import { User } from '../../user';
import * as usersControlPanel from './users.actions';

export interface State {
  isLoading: boolean;
  query: string;
  page: number;
  pageSize: number;
  numberOfPages: number;
  users: User[];
  numberOfUsers: number;
}

export const initialState: State = {
  isLoading: false,
  query: '',
  page: 1,
  pageSize: 20,
  numberOfPages: 1,
  users: null,
  numberOfUsers: 0,
};

export function reducer(state = initialState, action: usersControlPanel.Actions): State {
  switch (action.type) {
    case usersControlPanel.ActionTypes.LOAD_USERS:
      return assign({}, state, {
        isLoading: true,
      });

    case usersControlPanel.ActionTypes.LOAD_USERS_FAIL:
      return assign({}, state, {
        isLoading: false,
      });

    case usersControlPanel.ActionTypes.LOAD_USERS_SUCCESS:
      return assign({}, state, action.payload, {
        isLoading: false,
      });

    case usersControlPanel.ActionTypes.UPDATE_QUERY:
      return assign({}, state, {
        query: action.payload,
      });

    case usersControlPanel.ActionTypes.UPDATE_PAGE:
      return assign({}, state, {
        page: action.payload,
      });

    case usersControlPanel.ActionTypes.UPDATE_NUMBER_OF_PAGES:
      return assign({}, state, {
        numberOfPages: action.payload,
      });

    default:
      return state;
  }
}
