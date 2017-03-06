import { assign } from 'lodash';

import { FeedCriteria, FeedItem, initialState, reducer } from './index';
import * as feed from './feed.actions';

describe(`feed reducer`, () => {
  let feedItem;
  let feedItems;

  beforeEach(() => {
    feedItem = <FeedItem>{};
    feedItems = [feedItem];
  });

  it(`should set isLoading to false with LOAD_FAIL action`, () => {
    const loadingState = assign({}, initialState, { isLoading: true });
    const state = reducer(loadingState, new feed.LoadFailAction());
    expect(state).not.toBe(loadingState);
    expect(state.isLoading).toBe(false);
  });

  it(`should set isLoading to true, reset feedItems and store criteria with LOAD_INITIAL action`, () => {
    const criteria = <FeedCriteria>{};
    const state = reducer(initialState, new feed.LoadInitialAction(criteria));
    expect(state).not.toBe(initialState);
    expect(state.criteria).toBe(criteria);
    expect(state.isLoading).toBe(true);
    expect(state.feedItems).toEqual(initialState.feedItems);
  });

  it(`should set isLoading to true for LOAD_NEWER and LOAD_OLDER actions`, () => {
    let state = reducer(initialState, new feed.LoadNewerAction());
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(true);

    state = reducer(initialState, new feed.LoadOlderAction());
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(true);
  });

  it(`should set isLoading to false and replace feedItems with LOAD_INITIAL_SUCCESS action`, () => {
    const state = reducer(initialState, new feed.LoadInitialSuccessAction(feedItems));
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(false);
    expect(state.feedItems).toBe(feedItems);
  });

  it(`should prepend new feedItems with LOAD_NEWER_SUCCESS action`, () => {
    const newItem = <FeedItem>{};
    const itemsState = assign({}, initialState, { feedItems });
    const state = reducer(itemsState, new feed.LoadNewerSuccessAction([newItem]));
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(false);
    expect(state.feedItems[0]).toBe(newItem);
    expect(state.feedItems[1]).toBe(feedItem);
  });

  it(`should append new feedItems with LOAD_OLDER_SUCCESS action`, () => {
    const oldItem = <FeedItem>{};
    const itemsState = assign({}, initialState, { feedItems });
    const state = reducer(itemsState, new feed.LoadOlderSuccessAction([oldItem]));
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(false);
    expect(state.feedItems[0]).toBe(feedItem);
    expect(state.feedItems[1]).toBe(oldItem);
  });
});
