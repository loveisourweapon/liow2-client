import { reducer, State, User } from './index';
import * as user from './user.actions';

describe(`user reducer`, () => {
  const initialState: State = {
    current: null,
  };

  it(`should set current user with SET_CURRENT action`, () => {
    const currentGroup = <User>{};
    const state = reducer(initialState, new user.SetCurrentAction(currentGroup));
    expect(state).not.toBe(initialState);
    expect(state.current).toBe(currentGroup);
  });
});
