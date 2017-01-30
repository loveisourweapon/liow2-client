import { User } from '../models';
import * as auth from '../actions/auth';
import * as fromAuth from './auth';

describe(`auth reducer`, () => {
  const initialState: fromAuth.State = {
    isAuthenticated: false,
    user: null,
  };

  it(`should set isAuthenticated and user with LOGIN action`, () => {
    const user = <User>{};
    const state = fromAuth.reducer(initialState, new auth.LoginSuccessAction(user));
    expect(state).not.toBe(initialState);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toBe(user);
  });

  it(`should reset to new clone of initialState with LOGOUT action`, () => {
    const state = fromAuth.reducer(initialState, new auth.LogoutAction());
    expect(state).not.toBe(initialState);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
