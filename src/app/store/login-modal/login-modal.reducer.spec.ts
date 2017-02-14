import { assign } from 'lodash';

import { reducer, State } from './index';
import * as loginModal from './login-modal.actions';
import { Credentials } from '../auth';
import * as auth from '../auth/auth.actions';
import { User } from '../user';

describe(`login modal reducer`, () => {
  const initialState: State = {
    isOpen: false,
    isLoggingIn: false,
    credentials: {
      email: '',
      password: '',
    },
    joinGroup: true,
    errorMessage: '',
  };

  const credentials: Credentials = {
    email: 'test@example.com',
    password: 'testing123',
  };

  it(`should set isOpen to false with CLOSE action`, () => {
    const openState = assign({}, initialState, { isOpen: true });
    const state = reducer(openState, new loginModal.CloseAction());
    expect(state).not.toBe(openState);
    expect(state.isOpen).toBe(false);
  });

  it(`should set isOpen to true and reset form with OPEN action`, () => {
    const modifiedState = assign({}, initialState, { joinGroup: false });
    const state = reducer(modifiedState, new loginModal.OpenAction());
    expect(state).not.toBe(modifiedState);
    expect(state.isOpen).toBe(true);
    expect(state.joinGroup).toBe(initialState.joinGroup);
  });

  it(`should update credentials.email with UPDATE_EMAIL action`, () => {
    const state = reducer(initialState, new loginModal.UpdateEmailAction(credentials.email));
    expect(state).not.toBe(initialState);
    expect(state.credentials.email).toBe(credentials.email);
  });

  it(`should update credentials.password with UPDATE_PASSWORD action`, () => {
    const state = reducer(initialState, new loginModal.UpdatePasswordAction(credentials.password));
    expect(state).not.toBe(initialState);
    expect(state.credentials.password).toBe(credentials.password);
  });

  it(`should set isLoggingIn to true with LOGIN_WITH_EMAIL and LOGIN_WITH_FACEBOOK action`, () => {
    let state = reducer(initialState, new auth.LoginWithFacebookAction());
    expect(state).not.toBe(initialState);
    expect(state.isLoggingIn).toBe(true);

    state = reducer(initialState, new auth.LoginWithEmailAction(credentials));
    expect(state).not.toBe(initialState);
    expect(state.isLoggingIn).toBe(true);
  });

  it(`should set isOpen to false with LOGIN_SUCCESS action`, () => {
    const loggingInState = assign({}, initialState, { isLoggingIn: true });
    const state = reducer(loggingInState, new auth.LoginSuccessAction(<User>{}));
    expect(state).not.toBe(loggingInState);
    expect(state.isOpen).toBe(false);
  });

  it(`should set isLoggingIn to false and errorMessage with LOGIN_FAIL action`, () => {
    const errorMessage = 'Test error';
    const loggingInState = assign({}, initialState, { isLoggingIn: true });
    const state = reducer(loggingInState, new auth.LoginFailAction(errorMessage));
    expect(state).not.toBe(loggingInState);
    expect(state.isLoggingIn).toBe(false);
    expect(state.errorMessage).toBe(errorMessage);
  });
});
