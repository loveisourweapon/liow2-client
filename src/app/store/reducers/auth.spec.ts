import { Group, User } from '../models';
import * as auth from '../actions/auth';
import * as fromAuth from './auth';

describe(`auth reducer`, () => {
  const initialState: fromAuth.State = {
    isAuthenticated: false,
    user: null,
    group: null,
  };

  it(`should set isAuthenticated and user with LOGIN action`, () => {
    const user = <User>{ groups: [] };
    const state = fromAuth.reducer(initialState, new auth.LoginSuccessAction(user));
    expect(state).not.toBe(initialState);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toBe(user);
    expect(state.group).toBeNull();
  });

  it(`should set current group to user's first group with LOGIN action`, () => {
    const group1 = <Group>{}, group2 = <Group>{};
    const user = <User>{ groups: [group1, group2] };
    const state = fromAuth.reducer(initialState, new auth.LoginSuccessAction(user));
    expect(state).not.toBe(initialState);
    expect(state.group).toBe(group1);
  });

  it(`should reset to new clone of initialState with LOGOUT_SUCCESS action`, () => {
    const state = fromAuth.reducer(initialState, new auth.LogoutSuccessAction());
    expect(state).not.toBe(initialState);
    expect(state).toEqual(initialState);
  });

  it(`should replace the current group with SET_CURRENT_GROUP action`, () => {
    const group = <Group>{};
    const state = fromAuth.reducer(initialState, new auth.SetCurrentGroupAction(group));
    expect(state).not.toBe(initialState);
    expect(state.group).toBe(group);
  });
});
