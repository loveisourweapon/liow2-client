import { assign } from 'lodash';

import { Group } from '../../group';
import * as groupsControlPanel from './groups.actions';

export interface State {
  isLoading: boolean;
  query: string;
  page: number;
  pageSize: number;
  numberOfPages: number;
  groups: Group[];
  numberOfGroups: number;
}

export const initialState: State = {
  isLoading: false,
  query: '',
  page: 1,
  pageSize: 20,
  numberOfPages: 1,
  groups: null,
  numberOfGroups: 0,
};

export function reducer(state = initialState, action: groupsControlPanel.Actions): State {
  switch (action.type) {
    case groupsControlPanel.ActionTypes.LOAD_GROUPS:
      return assign({}, state, {
        isLoading: true,
      });

    case groupsControlPanel.ActionTypes.LOAD_GROUPS_FAIL:
      return assign({}, state, {
        isLoading: false,
      });

    case groupsControlPanel.ActionTypes.LOAD_GROUPS_SUCCESS:
      return assign({}, state, action.payload, {
        isLoading: false,
      });

    case groupsControlPanel.ActionTypes.UPDATE_QUERY:
      return assign({}, state, {
        query: action.payload,
      });

    case groupsControlPanel.ActionTypes.UPDATE_PAGE:
      return assign({}, state, {
        page: action.payload,
      });

    case groupsControlPanel.ActionTypes.UPDATE_NUMBER_OF_PAGES:
      return assign({}, state, {
        numberOfPages: action.payload,
      });

    default:
      return state;
  }
}
