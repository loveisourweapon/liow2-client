import { Counters, DeedCounterResult } from '../models';
import * as act from '../actions/act';
import * as deed from '../actions/deed';
import * as group from '../actions/group';
import * as user from '../actions/user';

export type State = Counters;

const initialState: State = { };

export function reducer(state = initialState, action: act.Actions|deed.Actions|group.Actions|user.Actions): State {
  switch (action.type) {
    case act.ActionTypes.COUNT_SUCCESS:
      return Object.assign({}, state, {
        [action.payload.counterId]: action.payload.count,
      });

    case group.ActionTypes.COUNT_SUCCESS:
      return Object.assign({}, state, {
        'groups': action.payload,
      });

    case user.ActionTypes.COUNT_SUCCESS:
      return Object.assign({}, state, {
        'users': action.payload,
      });

    case deed.ActionTypes.ALL_COUNTERS_SUCCESS:
      const deedCounters: any = {};
      action.payload.forEach((result: DeedCounterResult) => deedCounters[result.deed] = result.count);
      return Object.assign({}, state, deedCounters);

    default:
      return state;
  }
}

export function getGlobalCount(state: State) { return state['global']; }
export function getGroupsCount(state: State) { return state['groups']; }
export function getUsersCount(state: State) { return state['users']; }
