import { assign } from 'lodash';

import { FeedCriteria, FeedItem } from './index';
import * as feed from './feed.actions';

export interface State {
  criteria: FeedCriteria;
  isLoading: boolean;
  feedItems: FeedItem[];
}

const initialState: State = {
  criteria: null,
  isLoading: false,
  feedItems: [],
};

export function reducer(state = initialState, action: feed.Actions): State {
  switch (action.type) {
    case feed.ActionTypes.LOAD_FAIL:
      return assign({}, state, {
        isLoading: false,
      });

    case feed.ActionTypes.LOAD_INITIAL:
      return assign({}, state, {
        criteria: action.payload,
        feedItems: [],
        isLoading: true,
      });

    case feed.ActionTypes.LOAD_NEWER:
    case feed.ActionTypes.LOAD_OLDER:
      return assign({}, state, {
        isLoading: true,
      });

    case feed.ActionTypes.LOAD_INITIAL_SUCCESS:
      return assign({}, state, {
        feedItems: action.payload,
        isLoading: false,
      });

    case feed.ActionTypes.LOAD_NEWER_SUCCESS:
      return assign({}, state, {
        feedItems: [...action.payload, ...state.feedItems],
        isLoading: false,
      });

    case feed.ActionTypes.LOAD_OLDER_SUCCESS:
      return assign({}, state, {
        feedItems: [...state.feedItems, ...action.payload],
        isLoading: false,
      });

    default:
      return state;
  }
}

export function getCriteria(state: State) { return state.criteria; }
export function getFeedItems(state: State) { return state.feedItems; }
export function getIsLoading(state: State) { return state.isLoading; }
