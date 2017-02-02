import { User } from '../models';
import * as user from '../actions/user';
import * as fromUser from './user';

describe(`user reducer`, () => {
  const initialState: fromUser.State = {
    current: null,
  };

  it(`should set current user with SET_CURRENT action`, () => {
    const currentGroup = <User>{};
    const state = fromUser.reducer(initialState, new user.SetCurrentAction(currentGroup));
    expect(state).not.toBe(initialState);
    expect(state.current).toBe(currentGroup);
  });
});
