import { assign } from 'lodash';

import * as forgotPasswordModal from './forgot-password.actions';
import * as auth from '../../auth/auth.actions';

export interface State {
  isOpen: boolean;
  isSending: boolean;
  emailAddress: string;
}

export const initialState: State = {
  isOpen: false,
  isSending: false,
  emailAddress: '',
};

export function reducer(state = initialState, action: forgotPasswordModal.Actions|auth.Actions): State {
  switch (action.type) {
    case forgotPasswordModal.ActionTypes.CLOSE:
      return assign({}, state, {
        isOpen: false,
      });

    case forgotPasswordModal.ActionTypes.OPEN:
      return assign({}, initialState, {
        isOpen: true,
        emailAddress: action.payload,
      });

    case forgotPasswordModal.ActionTypes.UPDATE_EMAIL_ADDRESS:
      return assign({}, state, {
        emailAddress: action.payload,
      });

    case auth.ActionTypes.SEND_FORGOT_PASSWORD:
      return assign({}, state, {
        isSending: true,
      });

    case auth.ActionTypes.SEND_FORGOT_PASSWORD_FAIL:
      return assign({}, state, {
        isSending: false,
      });

    case auth.ActionTypes.SEND_FORGOT_PASSWORD_SUCCESS:
      return assign({}, state, {
        isOpen: false,
        isSending: false,
      });

    default:
      return state;
  }
}
