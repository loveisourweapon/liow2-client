import { assign } from 'lodash';

import { initialState, reducer } from './index';
import * as groupsControlPanel from './groups.actions';
import { Group } from '../../group';

describe(`groups control panel reducer`, () => {
  it(`should reset to initialState with INITIALISE action`, () => {
    const modifiedState = assign({}, initialState, { query: 'testing' });
    const state = reducer(modifiedState, new groupsControlPanel.InitialiseAction());
    expect(state).not.toBe(modifiedState);
    expect(state.query).toBe('');
  });

  it(`should override specified initial properties with INITIALISE action`, () => {
    const query = 'testing';
    const page = 2;
    const state = reducer(initialState, new groupsControlPanel.InitialiseAction({ query, page }));
    expect(state).not.toBe(initialState);
    expect(state.query).toBe(query);
    expect(state.page).toBe(page);
  });

  it(`should set isLoading to true with LOAD_GROUPS action`, () => {
    const state = reducer(initialState, new groupsControlPanel.LoadGroupsAction(initialState));
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(true);
  });

  it(`should set isLoading to false with LOAD_GROUPS_FAIL action`, () => {
    const loadingState = assign({}, initialState, { isLoading: true });
    const state = reducer(loadingState, new groupsControlPanel.LoadGroupsFailAction({ message: 'Test error' }));
    expect(state).not.toBe(loadingState);
    expect(state.isLoading).toBe(false);
  });

  it(`should set groups, numberOfGroups and isLoading to false with LOAD_GROUPS_SUCCESS action`, () => {
    const groups = [<Group>{}];
    const numberOfGroups = 1;
    const loadingState = assign({}, initialState, { isLoading: true });
    const state = reducer(loadingState, new groupsControlPanel.LoadGroupsSuccessAction({ groups, numberOfGroups }));
    expect(state).not.toBe(loadingState);
    expect(state.isLoading).toBe(false);
    expect(state.groups).toBe(groups);
    expect(state.numberOfGroups).toBe(numberOfGroups);
  });

  it(`should update query property with UPDATE_QUERY action`, () => {
    const query = 'testing';
    const state = reducer(initialState, new groupsControlPanel.UpdateQueryAction(query));
    expect(state).not.toBe(initialState);
    expect(state.query).toBe(query);
  });

  it(`should update page property with UPDATE_PAGE action`, () => {
    const page = 2;
    const state = reducer(initialState, new groupsControlPanel.UpdatePageAction(2));
    expect(state).not.toBe(initialState);
    expect(state.page).toBe(page);
  });
});
