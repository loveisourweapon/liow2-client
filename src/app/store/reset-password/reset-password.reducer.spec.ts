import { assign } from 'lodash';

import { reducer, State } from './index';
import * as resetPassword from './reset-password.actions';
import * as auth from '../auth/auth.actions';

describe(`reset password reducer`, () => {
  const initialState: State = {
    isSaving: false,
    password: '',
    confirmPassword: '',
    token: '',
  };

  const password = 'Password123';
  const token = 'abc123';

  it(`should reset to initial values with INITIALISE action`, () => {
    const modifiedState = assign({}, initialState, { password });
    const state = reducer(modifiedState, new resetPassword.InitialiseAction());
    expect(state).not.toBe(modifiedState);
    expect(state).not.toBe(initialState);
    expect(state.password).toBe(initialState.password);
  });

  it(`should update password with UPDATE_PASSWORD action`, () => {
    const state = reducer(initialState, new resetPassword.UpdatePasswordAction(password));
    expect(state).not.toBe(initialState);
    expect(state.password).toBe(password);
  });

  it(`should update confirmPassword with UPDATE_CONFIRM_PASSWORD action`, () => {
    const state = reducer(initialState, new resetPassword.UpdateConfirmPasswordAction(password));
    expect(state).not.toBe(initialState);
    expect(state.confirmPassword).toBe(password);
  });

  it(`should update token with UPDATE_TOKEN action`, () => {
    const state = reducer(initialState, new resetPassword.UpdateTokenAction(token));
    expect(state).not.toBe(initialState);
    expect(state.token).toBe(token);
  });

  it(`should set isSaving to true with RESET_PASSWORD action`, () => {
    const state = reducer(initialState, new auth.ResetPasswordAction({ password, token }));
    expect(state).not.toBe(initialState);
    expect(state.isSaving).toBe(true);
  });

  it(`should set isSaving to false with RESET_PASSWORD_DONE action`, () => {
    const savingState = assign({}, initialState, { isSaving: true });
    const state = reducer(savingState, new auth.ResetPasswordDoneAction());
    expect(state).not.toBe(savingState);
    expect(state.isSaving).toBe(false);
  });
});
