import { has } from 'lodash';

import { FeedItem } from '../models';
import * as feed from '../actions/feed';

export interface State {
  isLoading: boolean;
  feedItems: FeedItem[];
}

const initialState: State = {
  isLoading: false,
  feedItems: [],
};

export function reducer(state = initialState, action: feed.Actions): State {
  switch (action.type) {
    case feed.ActionTypes.LOAD:
      const isInitialLoad = !(has(action.payload, 'after') || has(action.payload, 'before'));
      return {
        feedItems: isInitialLoad ? [] : state.feedItems,
        isLoading: true,
      };

    case feed.ActionTypes.LOAD_INITIAL_SUCCESS:
      return {
        feedItems: action.payload,
        isLoading: false,
      };

    case feed.ActionTypes.LOAD_NEWER_SUCCESS:
      return {
        feedItems: [...action.payload, ...state.feedItems],
        isLoading: false,
      };

    case feed.ActionTypes.LOAD_OLDER_SUCCESS:
      return {
        feedItems: [...state.feedItems, ...action.payload],
        isLoading: false,
      };

    default:
      return state;
  }
}

export function getFeedItems(state: State) { return state.feedItems; }
export function getIsLoading(state: State) { return state.isLoading; }
