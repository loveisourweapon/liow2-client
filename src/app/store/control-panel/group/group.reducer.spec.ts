import { assign } from 'lodash';

import { initialState, reducer } from './index';
import * as groupControlPanel from './group.actions';
import * as group from '../../group/group.actions';
import { Group } from '../../group';

describe(`group control panel reducer`, () => {
  it(`should reset to initialState with FIND_AND_SET_GROUP action`, () => {
    const modifiedState = assign({}, initialState, { group: <Group>{}, numberOfMembers: 1 });
    const state = reducer(modifiedState, new groupControlPanel.FindAndSetGroupAction({}));
    expect(state).not.toBe(modifiedState);
    expect(state.group).toBeNull();
    expect(state.numberOfMembers).toBeNull();
  });

  it(`should set group with SET_GROUP action`, () => {
    const group = <Group>{};
    const state = reducer(initialState, new groupControlPanel.SetGroupAction(group));
    expect(state).not.toBe(initialState);
    expect(state.group).toBe(group);
  });

  it(`should set group with UPDATE_SUCCESS action`, () => {
    const updatedGroup = <Group>{};
    const state = reducer(initialState, new group.UpdateSuccessAction(updatedGroup));
    expect(state).not.toBe(initialState);
    expect(state.group).toBe(updatedGroup);
  });

  it(`should set numberOfMembers with SET_NUMBER_OF_MEMBERS action`, () => {
    const numberOfMembers = 2;
    const state = reducer(initialState, new groupControlPanel.SetNumberOfMembersAction(numberOfMembers));
    expect(state).not.toBe(initialState);
    expect(state.numberOfMembers).toBe(numberOfMembers);
  });
});
