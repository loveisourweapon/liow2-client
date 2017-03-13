import { assign } from 'lodash';

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

  it(`should update searchInput property and clear searchResults with UPDATE_SEARCH_INPUT action`, () => {
    const newValue = 'def';
    const updatedState = assign({}, initialState, { searchInput: 'abc', searchResults: [{}] });
    const state = reducer(updatedState, new layout.UpdateSearchInputAction(newValue));
    expect(state).not.toBe(updatedState);
    expect(state.searchInput).toBe(newValue);
    expect(state.searchResults).toEqual([]);
  });

  it(`should update searchResults property with UPDATE_SEARCH_RESULTS action`, () => {
    const searchResult = { id: 'abc123', name: 'Test result', type: 'Group' };
    const state = reducer(initialState, new layout.UpdateSearchResultsAction([searchResult]));
    expect(state).not.toBe(initialState);
    expect(state.searchResults[0]).toBe(searchResult);
  });
});
