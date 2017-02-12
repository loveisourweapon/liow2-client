import { Group } from './index';
import * as group from './group.actions';

export interface State {
  current: Group;
}

const initialState: State = {
  current: null,
};

export function reducer(state = initialState, action: group.Actions): State {
  switch (action.type) {
    case group.ActionTypes.SET_CURRENT:
      return { current: action.payload };

    default:
      return state;
  }
}

export function getCurrent(state: State) { return state.current; }
