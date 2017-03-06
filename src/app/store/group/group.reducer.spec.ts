import { Group, initialState, reducer, State } from './index';
import * as group from './group.actions';

describe(`group reducer`, () => {
  it(`should clear current group with FIND_AND_SET_CURRENT action`, () => {
    const groupState = <State>{ current: <Group>{} };
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
});
