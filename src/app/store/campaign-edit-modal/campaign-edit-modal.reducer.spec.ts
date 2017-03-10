import { assign } from 'lodash';

import { CampaignEditAction, initialState, reducer } from './index';
import * as campaignEditModal from './campaign-edit-modal.actions';
import { Campaign, DeedPublish, Group } from '../group';
import * as group from '../group/group.actions';

describe(`campaign edit modal reducer`, () => {
  it(`should set isOpen to false with CLOSE action`, () => {
    const openState = assign({}, initialState, { isOpen: true });
    const state = reducer(openState, new campaignEditModal.CloseAction());
    expect(state).not.toBe(openState);
    expect(state.isOpen).toBe(false);
  });

  it(`should set isOpen to true and action property with OPEN action`, () => {
    const action = CampaignEditAction.Update;
    const group = <Group>{};
    const campaign = <Campaign>{};
    const state = reducer(initialState, new campaignEditModal.OpenAction({ action, campaign, group }));
    expect(state).not.toBe(initialState);
    expect(state.isOpen).toBe(true);
    expect(state.action).toBe(action);
  });

  it(`should set the campaign.group property when opened with a group but without a campaign`, () => {
    const action = CampaignEditAction.Create;
    const group = <Group>{ _id: 'abc123' };
    const state = reducer(initialState, new campaignEditModal.OpenAction({ action, group }));
    expect(state).not.toBe(initialState);
    expect(state.campaign.group).toBe(group._id);
  });

  it(`should set the campaign property when opened with a group and a campaign`, () => {
    const action = CampaignEditAction.Update;
    const group = <Group>{ _id: 'abc123' };
    const campaign = <Campaign>{ _id: 'def456' };
    const state = reducer(initialState, new campaignEditModal.OpenAction({ action, campaign, group }));
    expect(state).not.toBe(initialState);
    expect(state.campaign).toBe(campaign);
  });

  it(`should update the deeds property with UPDATE_DEEDS action`, () => {
    const deeds = [<DeedPublish>{}];
    const state = reducer(initialState, new campaignEditModal.UpdateDeedsAction(deeds));
    expect(state).not.toBe(initialState);
    expect(state.deeds).toBe(deeds);
  });

  it(`should update the campaign.deeds property with UPDATE_SELECTED_DEEDS action`, () => {
    const deeds = [<DeedPublish>{}];
    const state = reducer(initialState, new campaignEditModal.UpdateSelectedDeedsAction(deeds));
    expect(state).not.toBe(initialState);
    expect(state.campaign.deeds).toBe(deeds);
  });

  it(`should set the isSaving property to true and reset errorMessage with CREATE_CAMPAIGN action`, () => {
    const newCampaign = <Campaign>{};
    const state = reducer(initialState, new group.CreateCampaignAction(newCampaign));
    expect(state).not.toBe(initialState);
    expect(state.isSaving).toBe(true);
    expect(state.errorMessage).toBe('');
  });

  it(`should set the isSaving property to false and an errorMessage with CREATE_CAMPAIGN_FAIL action`, () => {
    const error = { errors: {}, message: 'Test error message' };
    const state = reducer(initialState, new group.CreateCampaignFailAction(error));
    expect(state).not.toBe(initialState);
    expect(state.isSaving).toBe(false);
    expect(state.errorMessage).toBe(error.message);
  });

  it(`should set the isSaving and isOpen properties to false with CREATE_CAMPAIGN_SUCCESS action`, () => {
    const campaign = <Campaign>{};
    const state = reducer(initialState, new group.CreateCampaignSuccessAction(campaign));
    expect(state).not.toBe(initialState);
    expect(state.isOpen).toBe(false);
    expect(state.isSaving).toBe(false);
  });
});
