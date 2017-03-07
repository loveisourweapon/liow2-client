import { initialState, reducer } from './index';
import * as layout from './layout.actions';

describe(`layout reducer`, () => {
  it(`should update isMenuOpen property for SET_IS_MENU_OPEN action`, () => {
    const state = reducer(initialState, new layout.SetIsMenuOpenAction(true));
    expect(state).not.toBe(initialState);
    expect(state.isMenuOpen).toBe(true);
  });

  it(`should leave state untouched if SET_IS_MENU_OPEN action.payload is same as current value`, () => {
    const newValue = initialState.isMenuOpen;
    const state = reducer(initialState, new layout.SetIsMenuOpenAction(newValue));
    expect(state).toBe(initialState);
  });

  it(`should update isSmallScreen property for SET_IS_SMALL_SCREEN action`, () => {
    const state = reducer(initialState, new layout.SetIsSmallScreenAction(true));
    expect(state).not.toBe(initialState);
    expect(state.isSmallScreen).toBe(true);
  });

  it(`should leave state untouched if SET_IS_SMALL_SCREEN action.payload is same as current value`, () => {
    const newValue = initialState.isSmallScreen;
    const state = reducer(initialState, new layout.SetIsSmallScreenAction(newValue));
    expect(state).toBe(initialState);
  });
});
