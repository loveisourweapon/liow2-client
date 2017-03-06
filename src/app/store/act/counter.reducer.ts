import { assign } from 'lodash';

import { Counters, DeedCounterResult } from './index';
import * as act from './act.actions';
import * as deed from '../deed/deed.actions';
import * as group from '../group/group.actions';
import * as user from '../user/user.actions';

export type State = Counters;

export const initialState: State = { };

export function reducer(state = initialState, action: act.Actions|deed.Actions|group.Actions|user.Actions): State {
  switch (action.type) {
    case act.ActionTypes.COUNT_SUCCESS:
      return assign({}, state, {
        [action.payload.counterId]: action.payload.count,
      });

    case group.ActionTypes.COUNT_SUCCESS:
      return assign({}, state, {
        'groups': action.payload,
      });

    case user.ActionTypes.COUNT_SUCCESS:
      return assign({}, state, {
        'users': action.payload,
      });

    case deed.ActionTypes.ALL_COUNTERS_SUCCESS:
      const deedCounters: any = {};
      action.payload.forEach((result: DeedCounterResult) => deedCounters[result.deed] = result.count);
      return assign({}, state, deedCounters);

    default:
      return state;
  }
}

export function getGlobalCount(state: State) { return state['global']; }
export function getGroupsCount(state: State) { return state['groups']; }
export function getUsersCount(state: State) { return state['users']; }
