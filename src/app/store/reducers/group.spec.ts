import { Group } from '../models';
import * as group from '../actions/group';
import * as fromGroup from './group';

describe('group reducer', () => {
  const initialState: fromGroup.State = {
    current: null,
  };

  it(`should set current group with SET_CURRENT action`, () => {
    const currentGroup = <Group>{};
    const state = fromGroup.reducer(initialState, new group.SetCurrentAction(currentGroup));
    expect(state).not.toBe(initialState);
    expect(state.current).toBe(currentGroup);
  });
});
