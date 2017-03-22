import { assign } from 'lodash';

import { initialState, reducer } from './index';
import * as userControlPanel from './user.actions';
import { User } from '../../user';

describe(`user control panel reducer`, () => {
  it(`should set isEditing, firstName and lastName properties with SET_IS_EDITING true action`, () => {
    const isEditingName = true;
    const user = <User>{ firstName: 'Test', lastName: 'User' };
    const state = reducer(initialState, new userControlPanel.SetIsEditingAction({ isEditingName, user }));
    expect(state).not.toBe(initialState);
    expect(state.isEditingName).toBe(isEditingName);
    expect(state.firstName).toBe(user.firstName);
    expect(state.lastName).toBe(user.lastName);
  });

  it(`should set isEditing, and clear firstName and lastName properties with SET_IS_EDITING false action`, () => {
    const isEditingName = false;
    const isEditingState = assign({}, initialState, { isEditingName: true, firstName: 'Test', lastName: 'User' });
    const state = reducer(isEditingState, new userControlPanel.SetIsEditingAction({ isEditingName, user: null }));
    expect(state).not.toBe(isEditingState);
    expect(state.isEditingName).toBe(isEditingName);
    expect(state.firstName).toBe('');
    expect(state.lastName).toBe('');
  });

  it(`should set user with SET_USER action`, () => {
    const user = <User>{};
    const state = reducer(initialState, new userControlPanel.SetUserAction(user));
    expect(state).not.toBe(initialState);
    expect(state.user).toBe(user);
  });

  it(`should update firstName with UPDATE_FIRST_NAME action`, () => {
    const firstName = 'Test';
    const state = reducer(initialState, new userControlPanel.UpdateFirstNameAction(firstName));
    expect(state).not.toBe(initialState);
    expect(state.firstName).toBe(firstName);
  });

  it(`should update lastName with UPDATE_LAST_NAME action`, () => {
    const lastName = 'Test';
    const state = reducer(initialState, new userControlPanel.UpdateLastNameAction(lastName));
    expect(state).not.toBe(initialState);
    expect(state.lastName).toBe(lastName);
  });
});
