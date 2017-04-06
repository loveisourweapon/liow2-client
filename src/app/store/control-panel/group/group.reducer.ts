import { assign } from 'lodash';

import { Group } from '../../group';
import * as groupControlPanel from './group.actions';
import * as group from '../../group/group.actions';

export interface State {
  group: Group;
  numberOfMembers: number;
}

export const initialState: State = {
  group: null,
  numberOfMembers: null,
};

export function reducer(state = initialState, action: groupControlPanel.Actions|group.Actions): State {
  switch (action.type) {
    case groupControlPanel.ActionTypes.FIND_AND_SET_GROUP:
      return assign({}, initialState);

    case groupControlPanel.ActionTypes.SET_GROUP:
      return assign({}, state, {
        group: action.payload,
      });

    case groupControlPanel.ActionTypes.SET_NUMBER_OF_MEMBERS:
      return assign({}, state, {
        numberOfMembers: action.payload,
      });

    case group.ActionTypes.UPDATE_SUCCESS:
      return assign({}, state, {
        group: action.payload,
      });

    default:
      return state;
  }
}
