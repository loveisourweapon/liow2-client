import { User } from './index';
import * as user from './user.actions';

export interface State {
  current: User;
}

const initialState: State = {
  current: null,
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.ActionTypes.SET_CURRENT:
      return { current: action.payload };

    default:
      return state;
  }
}

export function getCurrent(state: State) { return state.current; }
