import * as fromLayout from './layout';
import * as layout from '../actions/layout';

describe('layoutReducer', () => {
  const initialState: fromLayout.State = {
    isMenuOpen: false,
  };

  it(`should toggle isMenuOpen with TOGGLE_MENU action`, () => {
    let state = fromLayout.reducer(initialState, new layout.ToggleMenuAction());
    expect(state.isMenuOpen).toBe(!initialState.isMenuOpen);

    state = fromLayout.reducer(state, new layout.ToggleMenuAction());
    expect(state.isMenuOpen).toBe(initialState.isMenuOpen);
  });

  it(`should return isMenuOpen as false for CLOSE_MENU action if isMenuOpen is true`, () => {
    let state: fromLayout.State = { isMenuOpen: true };
    state = fromLayout.reducer(state, new layout.CloseMenuAction());
    expect(state.isMenuOpen).toBe(false);
  });

  it(`should leave state untouched for CLOSE_MENU action if isMenuOpen is already false`, () => {
    const state = fromLayout.reducer(initialState, new layout.CloseMenuAction());
    expect(state).toEqual(initialState);
  });
});
