import { assign } from 'lodash';

import { Group, GroupTab } from './index';
import * as group from './group.actions';

export interface State {
  current: Group;
  currentTab: GroupTab;
}

export const initialState: State = {
  current: null,
  currentTab: GroupTab.Welcome,
};

export function reducer(state = initialState, action: group.Actions): State {
  switch (action.type) {
    case group.ActionTypes.FIND_AND_SET_CURRENT:
      return assign({}, state, {
        current: null,
      });

    case group.ActionTypes.SET_CURRENT:
      return assign({}, state, {
        current: action.payload,
      });

    case group.ActionTypes.SET_CURRENT_TAB:
      return state.currentTab !== action.payload
        ? assign({}, state, { currentTab: action.payload })
        : state
        ;

    default:
      return state;
  }
}

export function getCurrent(state: State) { return state.current; }
export function getCurrentTab(state: State) { return state.currentTab; }
