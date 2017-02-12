import { reducer, State } from './index';
import * as layout from './layout.actions';

describe(`layout reducer`, () => {
  const initialState: State = {
    isMenuOpen: false,
  };

  it(`should toggle isMenuOpen with TOGGLE_MENU action`, () => {
    let state = reducer(initialState, new layout.ToggleMenuAction());
    expect(state.isMenuOpen).toBe(!initialState.isMenuOpen);

    state = reducer(state, new layout.ToggleMenuAction());
    expect(state.isMenuOpen).toBe(initialState.isMenuOpen);
  });

  it(`should return isMenuOpen as false for CLOSE_MENU action if isMenuOpen is true`, () => {
    let state: State = { isMenuOpen: true };
    state = reducer(state, new layout.CloseMenuAction());
    expect(state.isMenuOpen).toBe(false);
  });

  it(`should leave state untouched for CLOSE_MENU action if isMenuOpen is already false`, () => {
    const state = reducer(initialState, new layout.CloseMenuAction());
    expect(state).toBe(initialState);
  });
});
