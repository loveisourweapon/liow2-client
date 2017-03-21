import { initialState, reducer } from './index';
import * as userControlPanel from './user.actions';
import { User } from '../../user';

describe(`user control panel reducer`, () => {
  it(`should set user with SET_USER action`, () => {
    const currentUser = <User>{};
    const state = reducer(initialState, new userControlPanel.SetUserAction(currentUser));
    expect(state).not.toBe(initialState);
    expect(state.user).toBe(currentUser);
  });
});
