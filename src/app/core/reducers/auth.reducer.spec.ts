import { authReducer, AuthState } from './auth.reducer';
import { LoginAction, LogoutAction } from '../actions';

describe('authReducer', () => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
  };

  it(`should set isAuthenticated and user with LOGIN action`, () => {
    const state = authReducer(initialState, new LoginAction());
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).not.toBeNull();
  });

  it(`should reset to new clone of initialState with LOGOUT action`, () => {
    const state = authReducer(initialState, new LogoutAction());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state).not.toBe(initialState);
  });

  it(`should leave state untouched for unknown action`, () => {
    const state = authReducer(initialState, { type: 'Unknown Type' });
    expect(state).toEqual(initialState);
  });
});
