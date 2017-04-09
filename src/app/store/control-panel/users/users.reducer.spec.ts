import { assign } from 'lodash';

import { initialState, reducer } from './index';
import * as usersControlPanel from './users.actions';
import { User } from '../../user';

describe(`users control panel reducer`, () => {
  it(`should reset all properties with INITIALISE action`, () => {
    const state = reducer(initialState, new usersControlPanel.InitialiseAction());
    expect(state).not.toBe(initialState);
    expect(state).toEqual(initialState);
  });

  it(`should set isLoading to true with LOAD_USERS action`, () => {
    const state = reducer(initialState, new usersControlPanel.LoadUsersAction(initialState));
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(true);
  });

  it(`should set isLoading to false with LOAD_USERS_FAIL action`, () => {
    const loadingState = assign({}, initialState, { isLoading: true });
    const state = reducer(loadingState, new usersControlPanel.LoadUsersFailAction({ message: 'Test error' }));
    expect(state).not.toBe(loadingState);
    expect(state.isLoading).toBe(false);
  });

  it(`should set users, numberOfUsers and isLoading to false with LOAD_USERS_SUCCESS action`, () => {
    const users = [<User>{}];
    const numberOfUsers = 1;
    const loadingState = assign({}, initialState, { isLoading: true });
    const state = reducer(loadingState, new usersControlPanel.LoadUsersSuccessAction({ users, numberOfUsers }));
    expect(state).not.toBe(loadingState);
    expect(state.isLoading).toBe(false);
    expect(state.users).toBe(users);
    expect(state.numberOfUsers).toBe(numberOfUsers);
  });

  it(`should update query property with UPDATE_QUERY action`, () => {
    const query = 'testing';
    const state = reducer(initialState, new usersControlPanel.UpdateQueryAction(query));
    expect(state).not.toBe(initialState);
    expect(state.query).toBe(query);
  });

  it(`should update groupId property with UPDATE_GROUP_ID action`, () => {
    const groupId = 'abc123';
    const state = reducer(initialState, new usersControlPanel.UpdateGroupIdAction(groupId));
    expect(state).not.toBe(initialState);
    expect(state.groupId).toBe(groupId);
  });

  it(`should update page property with UPDATE_PAGE action`, () => {
    const page = 2;
    const state = reducer(initialState, new usersControlPanel.UpdatePageAction(page));
    expect(state).not.toBe(initialState);
    expect(state.page).toBe(page);
  });

  it(`should update numberOfPages property with UPDATE_NUMBER_OF_PAGES action`, () => {
    const numberOfPages = 2;
    const state = reducer(initialState, new usersControlPanel.UpdateNumberOfPagesAction(numberOfPages));
    expect(state).not.toBe(initialState);
    expect(state.numberOfPages).toBe(numberOfPages);
  });
});
