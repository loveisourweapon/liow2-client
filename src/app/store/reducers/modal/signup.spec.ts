import { assign } from 'lodash';

import { NewUser } from '../../models';
import * as auth from '../../actions/auth';
import * as signupModal from '../../actions/modal/signup';
import * as fromSignupModal from './signup';

describe(`signup modal reducer`, () => {
  const initialState: fromSignupModal.State = {
    isOpen: false,
    isSigningUp: false,
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    joinGroup: false,
    showJoinGroup: false,
    errorMessage: '',
  };

  const newUser: NewUser = {
    email: 'test@example.com',
    password: 'testing123',
    firstName: 'Test',
    lastName: 'User',
  };

  it(`should set isOpen and showJoinGroup properties with OPEN action`, () => {
    const showJoinGroup = true;
    const state = fromSignupModal.reducer(initialState, new signupModal.OpenAction({ showJoinGroup }));
    expect(state).not.toBe(initialState);
    expect(state.isOpen).toBe(true);
    expect(state.showJoinGroup).toBe(showJoinGroup);
  });

  it(`should set isOpen to false with CLOSE action`, () => {
    const openState = assign({}, initialState, { isOpen: true });
    const state = fromSignupModal.reducer(openState, new signupModal.CloseAction());
    expect(state).not.toBe(openState);
    expect(state.isOpen).toBe(false);
  });

  it(`should update user.firstName with UPDATE_FIRST_NAME action`, () => {
    const state = fromSignupModal.reducer(initialState, new signupModal.UpdateFirstNameAction(newUser.firstName));
    expect(state).not.toBe(initialState);
    expect(state.user.firstName).toBe(newUser.firstName);
  });

  it(`should update user.lastName with UPDATE_LAST_NAME action`, () => {
    const state = fromSignupModal.reducer(initialState, new signupModal.UpdateLastNameAction(newUser.lastName));
    expect(state).not.toBe(initialState);
    expect(state.user.lastName).toBe(newUser.lastName);
  });

  it(`should update user.email with UPDATE_EMAIL action`, () => {
    const state = fromSignupModal.reducer(initialState, new signupModal.UpdateEmailAction(newUser.email));
    expect(state).not.toBe(initialState);
    expect(state.user.email).toBe(newUser.email);
  });

  it(`should update user.password with UPDATE_PASSWORD action`, () => {
    const state = fromSignupModal.reducer(initialState, new signupModal.UpdatePasswordAction(newUser.password));
    expect(state).not.toBe(initialState);
    expect(state.user.password).toBe(newUser.password);
  });

  it(`should set isSigningUp to true with SIGNUP and LOGIN_WITH_FACEBOOK actions`, () => {
    let state = fromSignupModal.reducer(initialState, new auth.SignupAction(newUser));
    expect(state).not.toBe(initialState);
    expect(state.isSigningUp).toBe(true);

    state = fromSignupModal.reducer(initialState, new auth.LoginWithFacebookAction());
    expect(state).not.toBe(initialState);
    expect(state.isSigningUp).toBe(true);
  });

  it(`should set isOpen to false with SIGNUP_SUCCESS action`, () => {
    const signingUpState = assign({}, initialState, { isSigningUp: true });
    const state = fromSignupModal.reducer(signingUpState, new auth.SignupSuccessAction());
    expect(state).not.toBe(signingUpState);
    expect(state.isOpen).toBe(false);
  });

  it(`should set isSigningUp to false and errorMessage with SIGNUP_FAIL action`, () => {
    const errorMessage = 'Test error';
    const signingUpState = assign({}, initialState, { isSigningUp: true });
    const state = fromSignupModal.reducer(signingUpState, new auth.SignupFailAction(errorMessage));
    expect(state).not.toBe(signingUpState);
    expect(state.isSigningUp).toBe(false);
    expect(state.errorMessage).toBe(errorMessage);
  });
});