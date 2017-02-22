import { assign } from 'lodash';

import { reducer, State } from './index';
import * as signupModal from './signup-modal.actions';
import * as auth from '../auth/auth.actions';
import { NewUser } from '../user';

describe(`signup modal reducer`, () => {
  const initialState: State = {
    isOpen: false,
    isSigningUp: false,
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    joinGroup: true,
    errorMessage: '',
    errors: {},
  };

  const newUser: NewUser = {
    email: 'test@example.com',
    password: 'testing123',
    firstName: 'Test',
    lastName: 'User',
  };

  it(`should set isOpen to false with CLOSE action`, () => {
    const openState = assign({}, initialState, { isOpen: true });
    const state = reducer(openState, new signupModal.CloseAction());
    expect(state).not.toBe(openState);
    expect(state.isOpen).toBe(false);
  });

  it(`should set isOpen to true and reset form with OPEN action`, () => {
    const modifiedState = assign({}, initialState, { joinGroup: false });
    const state = reducer(modifiedState, new signupModal.OpenAction());
    expect(state).not.toBe(modifiedState);
    expect(state.isOpen).toBe(true);
    expect(state.joinGroup).toBe(initialState.joinGroup);
  });

  it(`should update user.email with UPDATE_EMAIL action`, () => {
    const state = reducer(initialState, new signupModal.UpdateEmailAction(newUser.email));
    expect(state).not.toBe(initialState);
    expect(state.user.email).toBe(newUser.email);
  });

  it(`should update user.firstName with UPDATE_FIRST_NAME action`, () => {
    const state = reducer(initialState, new signupModal.UpdateFirstNameAction(newUser.firstName));
    expect(state).not.toBe(initialState);
    expect(state.user.firstName).toBe(newUser.firstName);
  });

  it(`should update user.lastName with UPDATE_LAST_NAME action`, () => {
    const state = reducer(initialState, new signupModal.UpdateLastNameAction(newUser.lastName));
    expect(state).not.toBe(initialState);
    expect(state.user.lastName).toBe(newUser.lastName);
  });

  it(`should update user.password with UPDATE_PASSWORD action`, () => {
    const state = reducer(initialState, new signupModal.UpdatePasswordAction(newUser.password));
    expect(state).not.toBe(initialState);
    expect(state.user.password).toBe(newUser.password);
  });

  it(`should set reset errors and isSigningUp to true with SIGNUP and LOGIN_WITH_FACEBOOK actions`, () => {
    let errorState = assign({}, initialState, { errorMessage: 'Test message' });
    let state = reducer(errorState, new auth.SignupAction(newUser));
    expect(state).not.toBe(errorState);
    expect(state.isSigningUp).toBe(true);
    expect(state.errorMessage).toBe('');

    errorState = assign({}, initialState, { errors: { email: {} } });
    state = reducer(errorState, new auth.LoginWithFacebookAction());
    expect(state).not.toBe(errorState);
    expect(state.isSigningUp).toBe(true);
    expect(state.errors).toEqual({});
  });

  it(`should set isOpen and isSigningUp to false with SIGNUP_SUCCESS action`, () => {
    const signingUpState = assign({}, initialState, { isSigningUp: true });
    const state = reducer(signingUpState, new auth.SignupSuccessAction());
    expect(state).not.toBe(signingUpState);
    expect(state.isOpen).toBe(false);
    expect(state.isSigningUp).toBe(false);
  });

  it(`should set isSigningUp to false and errorMessage with SIGNUP_FAIL action and empty errors object`, () => {
    const response = { errors: {}, message: 'Test error' };
    const signingUpState = assign({}, initialState, { isSigningUp: true });
    const state = reducer(signingUpState, new auth.SignupFailAction(response));
    expect(state).not.toBe(signingUpState);
    expect(state.isSigningUp).toBe(false);
    expect(state.errorMessage).toBe(response.message);
    expect(state.errors).toEqual(signingUpState.errors);
  });

  it(`should set isSigningUp to false and errors with SIGNUP_FAIL action and errors object`, () => {
    const response = { errors: { email: {} }, message: 'Test error' };
    const signingUpState = assign({}, initialState, { isSigningUp: true });
    const state = reducer(signingUpState, new auth.SignupFailAction(response));
    expect(state).not.toBe(signingUpState);
    expect(state.isSigningUp).toBe(false);
    expect(state.errors).toBe(response.errors);
    expect(state.errorMessage).toBe(signingUpState.errorMessage);
  });
});
