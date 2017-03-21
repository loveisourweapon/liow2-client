import { User } from '../../user';
import * as user from './user.actions';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null,
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.ActionTypes.SET_USER:
      return { user: action.payload };

    default:
      return state;
  }
}
