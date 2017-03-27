import * as deedPreviewModal from './deed-preview.actions';
import { Deed } from '../../deed';

export interface State {
  isOpen: boolean;
  deed: Deed;
}

export const initialState: State = {
  isOpen: false,
  deed: null,
};

export function reducer(state = initialState, action: deedPreviewModal.Actions): State {
  switch (action.type) {
    case deedPreviewModal.ActionTypes.CLOSE:
      return {
        isOpen: false,
        deed: null,
      };

    case deedPreviewModal.ActionTypes.OPEN:
      return {
        isOpen: true,
        deed: action.payload,
      };

    default:
      return state;
  }
}
