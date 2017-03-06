import { assign } from 'lodash';

import { initialState, reducer } from './index';
import * as forgotPasswordModal from './forgot-password-modal.actions';
import * as auth from '../auth/auth.actions';

describe(`forgot password modal reducer`, () => {
  const emailAddress = 'test@example.com';

  it(`should set isOpen to false with CLOSE action`, () => {
    const openState = assign({}, initialState, { isOpen: true });
    const state = reducer(openState, new forgotPasswordModal.CloseAction());
    expect(state).not.toBe(openState);
    expect(state.isOpen).toBe(false);
  });

  it(`should set isOpen to true and emailAddress with OPEN action`, () => {
    const state = reducer(initialState, new forgotPasswordModal.OpenAction(emailAddress));
    expect(state).not.toBe(initialState);
    expect(state.isOpen).toBe(true);
    expect(state.emailAddress).toBe(emailAddress);
  });

  it(`should update emailAddress with UPDATE_EMAIL action`, () => {
    const state = reducer(initialState, new forgotPasswordModal.UpdateEmailAddressAction(emailAddress));
    expect(state).not.toBe(initialState);
    expect(state.emailAddress).toBe(emailAddress);
  });

  it(`should set isSending to true with SEND_FORGOT_PASSWORD action`, () => {
    const state = reducer(initialState, new auth.SendForgotPasswordAction(emailAddress));
    expect(state).not.toBe(initialState);
    expect(state.isSending).toBe(true);
  });

  it(`should set isSending to false with SEND_FORGOT_PASSWORD_FAIL action`, () => {
    const sendingState = assign({}, initialState, { isSending: true });
    const state = reducer(sendingState, new auth.SendForgotPasswordFailAction());
    expect(state).not.toBe(sendingState);
    expect(state.isSending).toBe(false);
  });

  it(`should set isOpen and isSending to false with SEND_FORGOT_PASSWORD_SUCCESS action`, () => {
    const sendingState = assign({}, initialState, { isSending: true });
    const state = reducer(sendingState, new auth.SendForgotPasswordSuccessAction());
    expect(state).not.toBe(sendingState);
    expect(state.isOpen).toBe(false);
    expect(state.isSending).toBe(false);
  });
});
