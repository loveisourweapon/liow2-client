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
    const email = 'test@example.com';
    const state = fromLoginModal.reducer(initialState, new loginModal.UpdateEmailAction(email));
    expect(state).not.toBe(initialState);
    expect(state.credentials.email).toBe(email);
  });

  it(`should update credentials.password with UPDATE_PASSWORD action`, () => {
    const password = 'testing123';
    const state = fromLoginModal.reducer(initialState, new loginModal.UpdatePasswordAction(password));
    expect(state).not.toBe(initialState);
    expect(state.credentials.password).toBe(password);
  });
});
