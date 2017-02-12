import { FeedCriteria, FeedItem, reducer, State } from './index';
import * as feed from './feed.actions';

describe(`feed reducer`, () => {
  const initialState: State = {
    isLoading: false,
    feedItems: [],
  };

  let feedItem;
  let feedItems;

  beforeEach(() => {
    feedItem = <FeedItem>{};
    feedItems = [feedItem];
  });

  it(`should set isLoading to true and reset feedItems with LOAD action`, () => {
    const criteria = <FeedCriteria>{};
    const state = reducer(initialState, new feed.LoadAction(criteria));
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(true);
    expect(state.feedItems).toEqual(initialState.feedItems);
  });

  it(`should leave feedItems with LOAD action and 'before' or 'after' criteria`, () => {
    const itemsState = Object.assign({}, initialState, { feedItems });

    let criteria = <FeedCriteria>{ after: 'abc123' };
    let state = reducer(itemsState, new feed.LoadAction(criteria));
    expect(state).not.toBe(itemsState);
    expect(state.feedItems).toBe(itemsState.feedItems);

    criteria = <FeedCriteria>{ before: 'abc123' };
    state = reducer(itemsState, new feed.LoadAction(criteria));
    expect(state).not.toBe(itemsState);
    expect(state.feedItems).toBe(itemsState.feedItems);
  });

  it(`should replace isLoading and feedItems with LOAD_INITIAL_SUCCESS action`, () => {
    const state = reducer(initialState, new feed.LoadInitialSuccessAction(feedItems));
    expect(state).not.toBe(initialState);
    expect(state.feedItems).toBe(feedItems);
  });

  it(`should prepend new feedItems with LOAD_NEWER_SUCCESS action`, () => {
    const newItem = <FeedItem>{};
    const itemsState = Object.assign({}, initialState, { feedItems });
    const state = reducer(itemsState, new feed.LoadNewerSuccessAction([newItem]));
    expect(state).not.toBe(initialState);
    expect(state.feedItems[0]).toBe(newItem);
    expect(state.feedItems[1]).toBe(feedItem);
  });

  it(`should append new feedItems with LOAD_OLDER_SUCCESS action`, () => {
    const oldItem = <FeedItem>{};
    const itemsState = Object.assign({}, initialState, { feedItems });
    const state = reducer(itemsState, new feed.LoadOlderSuccessAction([oldItem]));
    expect(state).not.toBe(initialState);
    expect(state.feedItems[0]).toBe(feedItem);
    expect(state.feedItems[1]).toBe(oldItem);
  });
});
