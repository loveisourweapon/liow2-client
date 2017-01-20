import { layoutReducer, LayoutState } from './layout.reducer';
import { CloseMenuAction, ToggleMenuAction } from '../actions';

describe('layoutReducer', () => {
  const initialState: LayoutState = {
    isMenuOpen: false,
  };

  it(`should toggle isMenuOpen with TOGGLE_MENU action`, () => {
    let state = layoutReducer(initialState, new ToggleMenuAction());
    expect(state.isMenuOpen).toBe(!initialState.isMenuOpen);

    state = layoutReducer(state, new ToggleMenuAction());
    expect(state.isMenuOpen).toBe(initialState.isMenuOpen);
  });

  it(`should return isMenuOpen as false for CLOSE_MENU action if isMenuOpen is true`, () => {
    let state: LayoutState = { isMenuOpen: true };
    state = layoutReducer(state, new CloseMenuAction());
    expect(state.isMenuOpen).toBe(false);
  });

  it(`should leave state untouched for CLOSE_MENU action if isMenuOpen is already false`, () => {
    const state = layoutReducer(initialState, new CloseMenuAction());
    expect(state).toEqual(initialState);
  });

  it(`should leave state untouched for unknown action`, () => {
    const state = layoutReducer(initialState, { type: 'Unknown Type' });
    expect(state).toEqual(initialState);
  });
});
