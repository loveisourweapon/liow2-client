import { FeedCriteria, FeedItem } from '../models';
import * as feed from '../actions/feed';
import * as fromFeed from './feed';

describe(`feed reducer`, () => {
  const initialState: fromFeed.State = {
    isLoading: false,
    feedItems: null,
  };

  let feedItem;
  let feedItems;

  beforeEach(() => {
    feedItem = <FeedItem>{};
    feedItems = [feedItem];
  });

  it(`should set isLoading to true and reset feedItems with LOAD action`, () => {
    const criteria = <FeedCriteria>{};
    const state = fromFeed.reducer(initialState, new feed.LoadAction(criteria));
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(true);
    expect(state.feedItems).toBeNull();
  });

  it(`should leave feedItems with LOAD action and 'before' or 'after' criteria`, () => {
    const itemsState = Object.assign({}, initialState, { feedItems });

    let criteria = <FeedCriteria>{ after: 'abc123' };
    let state = fromFeed.reducer(itemsState, new feed.LoadAction(criteria));
    expect(state).not.toBe(itemsState);
    expect(state.feedItems).toBe(itemsState.feedItems);

    criteria = <FeedCriteria>{ before: 'abc123' };
    state = fromFeed.reducer(itemsState, new feed.LoadAction(criteria));
    expect(state).not.toBe(itemsState);
    expect(state.feedItems).toBe(itemsState.feedItems);
  });

  it(`should replace isLoading and feedItems with LOAD_INITIAL_SUCCESS action`, () => {
    const state = fromFeed.reducer(initialState, new feed.LoadInitialSuccessAction(feedItems));
    expect(state).not.toBe(initialState);
    expect(state.feedItems).toBe(feedItems);
  });

  it(`should prepend new feedItems with LOAD_NEWER_SUCCESS action`, () => {
    const newItem = <FeedItem>{};
    const itemsState = Object.assign({}, initialState, { feedItems });
    const state = fromFeed.reducer(itemsState, new feed.LoadNewerSuccessAction([newItem]));
    expect(state).not.toBe(initialState);
    expect(state.feedItems[0]).toBe(newItem);
    expect(state.feedItems[1]).toBe(feedItem);
  });

  it(`should append new feedItems with LOAD_OLDER_SUCCESS action`, () => {
    const oldItem = <FeedItem>{};
    const itemsState = Object.assign({}, initialState, { feedItems });
    const state = fromFeed.reducer(itemsState, new feed.LoadOlderSuccessAction([oldItem]));
    expect(state).not.toBe(initialState);
    expect(state.feedItems[0]).toBe(feedItem);
    expect(state.feedItems[1]).toBe(oldItem);
  });
});
