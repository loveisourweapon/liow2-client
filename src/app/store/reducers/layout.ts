import * as layout from '../actions/layout';

export interface State {
  isMenuOpen: boolean;
}

const initialState: State = {
  isMenuOpen: false,
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.ActionTypes.TOGGLE_MENU:
      return { isMenuOpen: !state.isMenuOpen };

    case layout.ActionTypes.CLOSE_MENU:
      return state.isMenuOpen
        ? { isMenuOpen: false }
        : state
        ;

    default:
      return state;
  }
}

export function getIsMenuOpen(state: State) { return state.isMenuOpen; }
