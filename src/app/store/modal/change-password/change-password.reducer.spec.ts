import { assign } from 'lodash';

import { initialState, reducer } from './index';
import * as changePasswordModal from './change-password.actions';
import * as auth from '../../auth/auth.actions';
import { User } from '../../user';

describe(`change password modal reducer`, () => {
  const user = <User>{};
  const currentPassword = 'currentPassword123';
  const newPassword = 'newPassword123';
  const confirmPassword = 'confirmPassword123';

  it(`should set isOpen to false and reset user with CLOSE action`, () => {
    const openState = assign({}, initialState, { isOpen: true, user });
    const state = reducer(openState, new changePasswordModal.CloseAction());
    expect(state).not.toBe(openState);
    expect(state.isOpen).toBe(false);
    expect(state.user).toBeNull();
  });

  it(`should set isOpen to true and user property with OPEN action`, () => {
    const state = reducer(initialState, new changePasswordModal.OpenAction(user));
    expect(state).not.toBe(initialState);
    expect(state.isOpen).toBe(true);
    expect(state.user).toBe(user);
  });

  it(`should update currentPassword property with UPDATE_CURRENT_PASSWORD action`, () => {
    const state = reducer(initialState, new changePasswordModal.UpdateCurrentPasswordAction(currentPassword));
    expect(state).not.toBe(initialState);
    expect(state.currentPassword).toBe(currentPassword);
  });

  it(`should update newPassword property with UPDATE_NEW_PASSWORD action`, () => {
    const state = reducer(initialState, new changePasswordModal.UpdateNewPasswordAction(newPassword));
    expect(state).not.toBe(initialState);
    expect(state.newPassword).toBe(newPassword);
  });

  it(`should update confirmPassword property with UPDATE_CONFIRM_PASSWORD action`, () => {
    const state = reducer(initialState, new changePasswordModal.UpdateConfirmPasswordAction(confirmPassword));
    expect(state).not.toBe(initialState);
    expect(state.confirmPassword).toBe(confirmPassword);
  });

  it(`should set isSaving to true and reset errorMessage with CHANGE_PASSWORD action`, () => {
    const errorState = assign({}, initialState, { errorMessage: 'Test error' });
    const state = reducer(errorState, new auth.ChangePasswordAction({ user, currentPassword, newPassword }));
    expect(state).not.toBe(errorState);
    expect(state.isSaving).toBe(true);
    expect(state.errorMessage).toBe('');
  });

  it(`should set isSaving to false and errorMessage with CHANGE_PASSWORD_FAIL action`, () => {
    const error = { message: 'Test error' };
    const savingState = assign({}, initialState, { isSaving: true });
    const state = reducer(savingState, new auth.ChangePasswordFailAction(error));
    expect(state).not.toBe(savingState);
    expect(state.isSaving).toBe(false);
    expect(state.errorMessage).toBe(error.message);
  });

  it(`should reset isOpen, isSaving and user properties with CHANGE_PASSWORD_SUCCESS action`, () => {
    const savingState = assign({}, initialState, { isOpen: true, isSaving: true, user });
    const state = reducer(savingState, new auth.ChangePasswordSuccessAction());
    expect(state).not.toBe(savingState);
    expect(state.isOpen).toBe(false);
    expect(state.isSaving).toBe(false);
    expect(state.user).toBeNull();
  });
});
