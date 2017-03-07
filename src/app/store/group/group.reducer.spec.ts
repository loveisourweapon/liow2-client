import { assign } from 'lodash';

import { Group, GroupTab } from './index';
import { initialState, reducer } from './group.reducer';
import * as group from './group.actions';

describe(`group reducer`, () => {
  it(`should clear current group with FIND_AND_SET_CURRENT action`, () => {
    const groupState = assign({}, initialState, { current: <Group>{} });
    const state = reducer(groupState, new group.FindAndSetCurrentAction({}));
    expect(state).not.toBe(groupState);
    expect(state.current).toBeNull();
  });

  it(`should set current group with SET_CURRENT action`, () => {
    const currentGroup = <Group>{};
    const state = reducer(initialState, new group.SetCurrentAction(currentGroup));
    expect(state).not.toBe(initialState);
    expect(state.current).toBe(currentGroup);
  });

  it(`should set current tab with SET_CURRENT_TAB action`, () => {
    const currentTab = GroupTab.Feed;
    const state = reducer(initialState, new group.SetCurrentTabAction(currentTab));
    expect(state).not.toBe(initialState);
    expect(state.currentTab).toBe(currentTab);
  });

  it(`should leave state untouched if SET_CURRENT_TAB payload is same as current value`, () => {
    const currentTab = initialState.currentTab;
    const state = reducer(initialState, new group.SetCurrentTabAction(currentTab));
    expect(state).toBe(initialState);
  });
});
