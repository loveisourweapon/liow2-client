import { assign } from 'lodash';

import { Deed } from './index';
import * as act from '../act/act.actions';
import * as deed from './deed.actions';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  isDoing: boolean;
  deeds: Deed[];
  current: Deed;
}

const initialState: State = {
  isLoading: true,
  isLoaded: false,
  isDoing: false,
  deeds: [],
  current: null,
};

export function reducer(state = initialState, action: act.Actions|deed.Actions): State {
  switch (action.type) {
    case act.ActionTypes.DONE:
      return assign({}, state, {
        isDoing: true,
      });

    case act.ActionTypes.DONE_SUCCESS:
    case act.ActionTypes.DONE_FAIL:
      return assign({}, state, {
        isDoing: false,
      });

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
export function getIsDoing(state: State) { return state.isDoing; }
export function getDeeds(state: State) { return state.deeds; }
export function getCurrent(state: State) { return state.current; }
