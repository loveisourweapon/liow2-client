import { Deed } from '../models';
import * as deed from '../actions/deed';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  deeds: Deed[];
}

const initialState: State = {
  isLoading: true,
  isLoaded: false,
  deeds: [],
};

export function reducer(state = initialState, action: deed.Actions): State {
  switch (action.type) {
    case deed.ActionTypes.FIND:
      return Object.assign({}, state, { isLoading: true });

    case deed.ActionTypes.FIND_SUCCESS:
      return {
        isLoading: false,
        isLoaded: true,
        deeds: action.payload,
      };

    case deed.ActionTypes.FIND_FAIL:
      return Object.assign({}, state, { isLoading: false });

    default:
      return state;
  }
}

export function getIsLoading(state: State) { return state.isLoading; }
export function getIsLoaded(state: State) { return state.isLoaded; }
export function getDeeds(state: State) { return state.deeds; }
