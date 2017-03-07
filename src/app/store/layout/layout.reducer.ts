import { assign } from 'lodash';

import * as layout from './layout.actions';

export interface State {
  isMenuOpen: boolean;
  isSmallScreen: boolean;
}

export const initialState: State = {
  isMenuOpen: false,
  isSmallScreen: false,
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

    default:
      return state;
  }
}

export function getIsMenuOpen(state: State) { return state.isMenuOpen; }
export function getIsSmallScreen(state: State) { return state.isSmallScreen; }
