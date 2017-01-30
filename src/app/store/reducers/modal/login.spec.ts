import { Credentials, User } from '../../models';
import * as auth from '../../actions/auth';
import * as loginModal from '../../actions/modal/login';
import * as fromLoginModal from './login';

describe(`login modal reducer`, () => {
  const initialState: fromLoginModal.State = {
    isOpen: false,
    isLoggingIn: false,
    credentials: {
      email: '',
      password: '',
    },
    joinGroup: false,
    showJoinGroup: false,
    errorMessage: '',
  };

  const credentials: Credentials = {
    email: 'test@example.com',
    password: 'testing123',
  };

  it(`should set isOpen and showJoinGroup properties with OPEN action`, () => {
    const showJoinGroup = true;
    const state = fromLoginModal.reducer(initialState, new loginModal.OpenAction({ showJoinGroup }));
    expect(state).not.toBe(initialState);
    expect(state.isOpen).toBe(true);
    expect(state.showJoinGroup).toBe(showJoinGroup);
  });

  it(`should set isOpen to false with CLOSE action`, () => {
    const openState = Object.assign({}, initialState, { isOpen: true });
    const state = fromLoginModal.reducer(openState, new loginModal.CloseAction());
    expect(state).not.toBe(openState);
    expect(state.isOpen).toBe(false);
  });

  it(`should update credentials.email with UPDATE_EMAIL action`, () => {
    const state = fromLoginModal.reducer(initialState, new loginModal.UpdateEmailAction(credentials.email));
    expect(state).not.toBe(initialState);
    expect(state.credentials.email).toBe(credentials.email);
  });

  it(`should update credentials.password with UPDATE_PASSWORD action`, () => {
    const state = fromLoginModal.reducer(initialState, new loginModal.UpdatePasswordAction(credentials.password));
    expect(state).not.toBe(initialState);
    expect(state.credentials.password).toBe(credentials.password);
  });

  it(`should set isLoggingIn to true with LOGIN_WITH_EMAIL and LOGIN_WITH_FACEBOOK action`, () => {
    let state = fromLoginModal.reducer(initialState, new auth.LoginWithFacebookAction());
    expect(state).not.toBe(initialState);
    expect(state.isLoggingIn).toBe(true);

    state = fromLoginModal.reducer(initialState, new auth.LoginWithEmailAction(credentials));
    expect(state).not.toBe(initialState);
    expect(state.isLoggingIn).toBe(true);
  });

  it(`should set isOpen to false with LOGIN_SUCCESS action`, () => {
    const loggingInState = Object.assign({}, initialState, { isLoggingIn: true });
    const state = fromLoginModal.reducer(loggingInState, new auth.LoginSuccessAction(<User>{}));
    expect(state).not.toBe(loggingInState);
    expect(state.isOpen).toBe(false);
  });

  it(`should set isLoggingIn to false and errorMessage with LOGIN_FAIL action`, () => {
    const errorMessage = 'Test error';
    const loggingInState = Object.assign({}, initialState, { isLoggingIn: true });
    const state = fromLoginModal.reducer(loggingInState, new auth.LoginFailAction(errorMessage));
    expect(state).not.toBe(loggingInState);
    expect(state.isLoggingIn).toBe(false);
    expect(state.errorMessage).toBe(errorMessage);
  });
});
