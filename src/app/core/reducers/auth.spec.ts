import * as fromAuth from './auth';
import * as auth from '../actions/auth';

describe('authReducer', () => {
  const initialState: fromAuth.State = {
    isAuthenticated: false,
    user: null,
  };

  it(`should set isAuthenticated and user with LOGIN action`, () => {
    const state = fromAuth.reducer(initialState, new auth.LoginAction());
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).not.toBeNull();
  });

  it(`should reset to new clone of initialState with LOGOUT action`, () => {
    const state = fromAuth.reducer(initialState, new auth.LogoutAction());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state).not.toBe(initialState);
  });
});
