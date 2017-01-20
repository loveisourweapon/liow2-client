import { LayoutActions, LayoutActionTypes } from '../actions';

export interface LayoutState {
  isMenuOpen: boolean;
}

const initialState: LayoutState = {
  isMenuOpen: false,
};

export function layoutReducer(state = initialState, action: LayoutActions): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.TOGGLE_MENU:
      return { isMenuOpen: !state.isMenuOpen };

    case LayoutActionTypes.CLOSE_MENU:
      return state.isMenuOpen ? { isMenuOpen: false } : state;

    default:
      return state;
  }
}
