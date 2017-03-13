import { assign } from 'lodash';

import { SearchItem } from './index';
import * as layout from './layout.actions';

export interface State {
  isMenuOpen: boolean;
  isSmallScreen: boolean;
  searchInput: string;
  searchResults: SearchItem[];
}

export const initialState: State = {
  isMenuOpen: false,
  isSmallScreen: false,
  searchInput: '',
  searchResults: [],
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.ActionTypes.SET_IS_MENU_OPEN:
      return state.isMenuOpen !== action.payload
        ? assign({}, state, { isMenuOpen: action.payload })
        : state
        ;

    case layout.ActionTypes.SET_IS_SMALL_SCREEN:
      return state.isSmallScreen !== action.payload
        ? assign({}, state, { isSmallScreen: action.payload })
        : state
        ;

    case layout.ActionTypes.UPDATE_SEARCH_INPUT:
      return assign({}, state, {
        searchInput: action.payload,
        searchResults: [],
      });

    case layout.ActionTypes.UPDATE_SEARCH_RESULTS:
      return assign({}, state, {
        searchResults: action.payload,
      });

    default:
      return state;
  }
}

export function getIsMenuOpen(state: State) { return state.isMenuOpen; }
export function getIsSmallScreen(state: State) { return state.isSmallScreen; }
export function getSearchInput(state: State) { return state.searchInput; }
export function getSearchResults(state: State) { return state.searchResults; }
