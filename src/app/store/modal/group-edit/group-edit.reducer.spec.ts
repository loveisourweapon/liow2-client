import { assign } from 'lodash';

import { GroupEditAction, initialState } from './index';
import { reducer } from './group-edit.reducer';
import * as groupEditModal from './group-edit.actions';
import { Group } from '../../group';
import { User } from '../../user';

describe(`group edit modal reducer`, () => {
  it(`should set isOpen to false with CLOSE action`, () => {
    const openState = assign({}, initialState, { isOpen: true });
    const state = reducer(openState, new groupEditModal.CloseAction());
    expect(state).not.toBe(openState);
    expect(state.isOpen).toBe(false);
  });

  it(`should set isOpen to false and action property with OPEN action`, () => {
    const action = GroupEditAction.Update;
    const state = reducer(initialState, new groupEditModal.OpenAction({ action }));
    expect(state).not.toBe(initialState);
    expect(state.isOpen).toBe(true);
    expect(state.action).toBe(action);
  });

  it(`should set the group and setupCampaign properties when opened with a group`, () => {
    const initialise = { action: GroupEditAction.Update, group: <Group>{} };
    const state = reducer(initialState, new groupEditModal.OpenAction(initialise));
    expect(state).not.toBe(initialState);
    expect(state.group).toBe(initialise.group);
    expect(state.setupCampaign).toBe(false);
  });

  it(`should update the groupUsers property with UPDATE_GROUP_USERS action`, () => {
    const users = [<User>{}];
    const state = reducer(initialState, new groupEditModal.UpdateGroupUsersAction(users));
    expect(state).not.toBe(initialState);
    expect(state.groupUsers).toBe(users);
  });

  it(`should update the group.name property with UPDATE_NAME action`, () => {
    const name = 'Test group name';
    const state = reducer(initialState, new groupEditModal.UpdateNameAction(name));
    expect(state).not.toBe(initialState);
    expect(state.group.name).toBe(name);
  });

  it(`should update the group.logo property with UPDATE_LOGO action`, () => {
    const logo = '/path/to/logo.png';
    const state = reducer(initialState, new groupEditModal.UpdateLogoAction(logo));
    expect(state).not.toBe(initialState);
    expect(state.group.logo).toBe(logo);
  });

  it(`should update the group.coverImage property with UPDATE_COVER_IMAGE action`, () => {
    const coverImage = '/path/to/cover-image.png';
    const state = reducer(initialState, new groupEditModal.UpdateCoverImageAction(coverImage));
    expect(state).not.toBe(initialState);
    expect(state.group.coverImage).toBe(coverImage);
  });

  it(`should update the group.admins property with UPDATE_ADMINS action`, () => {
    const admins = ['abc123'];
    const state = reducer(initialState, new groupEditModal.UpdateAdminsAction(admins));
    expect(state).not.toBe(initialState);
    expect(state.group.admins).toBe(admins);
  });

  it(`should update the group.welcomeMessage property with UPDATE_WELCOME_MESSAGE action`, () => {
    const welcomeMessage = 'Test **welcome message**';
    const state = reducer(initialState, new groupEditModal.UpdateWelcomeMessageAction(welcomeMessage));
    expect(state).not.toBe(initialState);
    expect(state.group.welcomeMessage).toBe(welcomeMessage);
  });

  it(`should update the setupCampaign property with UPDATE_SETUP_CAMPAIGN action`, () => {
    const setupCampaign = false;
    const state = reducer(initialState, new groupEditModal.UpdateSetupCampaignAction(setupCampaign));
    expect(state).not.toBe(initialState);
    expect(state.setupCampaign).toBe(setupCampaign);
  });

  // TODO: need more tests for the save actions?
});
