import { assign } from 'lodash';

import { initialState, reducer } from './index';
import * as groupsControlPanel from './groups.actions';
import { Group } from '../../group';

describe(`groups control panel reducer`, () => {
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
    const state = reducer(initialState, new groupsControlPanel.UpdatePageAction(page));
    expect(state).not.toBe(initialState);
    expect(state.page).toBe(page);
  });

  it(`should update numberOfPages property with UPDATE_NUMBER_OF_PAGES action`, () => {
    const numberOfPages = 2;
    const state = reducer(initialState, new groupsControlPanel.UpdateNumberOfPagesAction(numberOfPages));
    expect(state).not.toBe(initialState);
    expect(state.numberOfPages).toBe(numberOfPages);
  });
});
