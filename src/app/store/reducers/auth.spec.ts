import * as auth from '../actions/auth';
import * as fromAuth from './auth';

describe('auth reducer', () => {
  const initialState: fromAuth.State = {
    isAuthenticated: false,
    user: null,
  };

  it(`should set isAuthenticated and user with LOGIN action`, () => {
    const state = fromAuth.reducer(initialState, new auth.LoginAction());
    expect(state).not.toBe(initialState);
    expect(state.isAuthenticated).toBe(true);
  });

  it(`should reset to new clone of initialState with LOGOUT action`, () => {
    const state = fromAuth.reducer(initialState, new auth.LogoutAction());
    expect(state).not.toBe(initialState);
    expect(state.isAuthenticated).toBe(false);
  });
});
