import { assign } from 'lodash';

import { Deed } from './index';
import * as deed from './deed.actions';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  deeds: Deed[];
  current: Deed;
}

const initialState: State = {
  isLoading: true,
  isLoaded: false,
  deeds: [],
  current: null,
};

export function reducer(state = initialState, action: deed.Actions): State {
  switch (action.type) {
    case deed.ActionTypes.FIND_ALL:
      return assign({}, state, {
        isLoading: true,
      });

    case deed.ActionTypes.FIND_ALL_SUCCESS:
      return assign({}, state, {
        isLoading: false,
        isLoaded: true,
        deeds: action.payload,
      });

    case deed.ActionTypes.FIND_ALL_FAIL:
      return assign({}, state, {
        isLoading: false,
      });

    case deed.ActionTypes.FIND_AND_SET_CURRENT:
      return assign({}, state, {
        current: null,
      });

    case deed.ActionTypes.SET_CURRENT:
      return assign({}, state, {
        current: action.payload,
      });

    default:
      return state;
  }
}

export function getIsLoading(state: State) { return state.isLoading; }
export function getIsLoaded(state: State) { return state.isLoaded; }
export function getDeeds(state: State) { return state.deeds; }
export function getCurrent(state: State) { return state.current; }
