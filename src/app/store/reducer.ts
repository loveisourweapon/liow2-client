import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import { environment } from '../../environments/environment';

import { Counters } from './act';
import { Deed } from './deed';
import { Campaign, Group } from './group';
import { User } from './user';

import * as fromRouter from '@ngrx/router-store';
import * as fromCounter from './act/counter.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromDeed from './deed/deed.reducer';
import * as fromFeed from './feed/feed.reducer';
import * as fromGroup from './group/group.reducer';
import * as fromLayout from './layout/layout.reducer';
import * as fromResetPassword from './reset-password/reset-password.reducer';
import * as fromUser from './user/user.reducer';
import * as fromCampaignEditModal from './modal/campaign-edit/campaign-edit.reducer';
import * as fromChangePasswordModal from './modal/change-password/change-password.reducer';
import * as fromDeedPreviewModal from './modal/deed-preview/deed-preview.reducer';
import * as fromForgotPasswordModal from './modal/forgot-password/forgot-password.reducer';
import * as fromGroupEditModal from './modal/group-edit/group-edit.reducer';
import * as fromLoginModal from './modal/login/login.reducer';
import * as fromSignupModal from './modal/signup/signup.reducer';
import * as fromGroupControlPanel from './control-panel/group/group.reducer';
import * as fromGroupsControlPanel from './control-panel/groups/groups.reducer';
import * as fromUserControlPanel from './control-panel/user/user.reducer';
import * as fromUsersControlPanel from './control-panel/users/users.reducer';

export interface State {
  counters: fromCounter.State;
  auth: fromAuth.State;
  deed: fromDeed.State;
  feed: fromFeed.State;
  group: fromGroup.State;
  layout: fromLayout.State;
  resetPassword: fromResetPassword.State;
  router: fromRouter.RouterState;
  user: fromUser.State;

  // Modals
  modalCampaignEdit: fromCampaignEditModal.State;
  modalChangePassword: fromChangePasswordModal.State;
  modalDeedPreview: fromDeedPreviewModal.State;
  modalForgotPassword: fromForgotPasswordModal.State;
  modalGroupEdit: fromGroupEditModal.State;
  modalLogin: fromLoginModal.State;
  modalSignup: fromSignupModal.State;

  // Control panels
  groupControlPanel: fromGroupControlPanel.State;
  groupsControlPanel: fromGroupsControlPanel.State;
  userControlPanel: fromUserControlPanel.State;
  usersControlPanel: fromUsersControlPanel.State;
}

const reducers = {
  counters: fromCounter.reducer,
  auth: fromAuth.reducer,
  deed: fromDeed.reducer,
  feed: fromFeed.reducer,
  group: fromGroup.reducer,
  layout: fromLayout.reducer,
  resetPassword: fromResetPassword.reducer,
  router: fromRouter.routerReducer,
  user: fromUser.reducer,

  // Modals
  modalCampaignEdit: fromCampaignEditModal.reducer,
  modalChangePassword: fromChangePasswordModal.reducer,
  modalDeedPreview: fromDeedPreviewModal.reducer,
  modalForgotPassword: fromForgotPasswordModal.reducer,
  modalGroupEdit: fromGroupEditModal.reducer,
  modalLogin: fromLoginModal.reducer,
  modalSignup: fromSignupModal.reducer,

  // Control panels
  groupControlPanel: fromGroupControlPanel.reducer,
  groupsControlPanel: fromGroupsControlPanel.reducer,
  userControlPanel: fromUserControlPanel.reducer,
  usersControlPanel: fromUsersControlPanel.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any): State {
  return environment.production
    ? productionReducer(state, action)
    : developmentReducer(state, action)
    ;
}


/**
 * Counters state selectors
 */
export function getCountersState(state: State) { return state.counters; }
export const getGlobalCount = createSelector(getCountersState, fromCounter.getGlobalCount);
export const getGroupsCount = createSelector(getCountersState, fromCounter.getGroupsCount);
export const getUsersCount = createSelector(getCountersState, fromCounter.getUsersCount);


/**
 * Auth state selectors
 */
export function getAuthState(state: State) { return state.auth; }
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
export const getAuthUser = createSelector(getAuthState, fromAuth.getUser);
export const getAuthGroup = createSelector(getAuthState, fromAuth.getGroup);


/**
 * Deed state selectors
 */
export function getDeedState(state: State) { return state.deed; }
export const getDeedIsLoading = createSelector(getDeedState, fromDeed.getIsLoading);
export const getDeedIsLoaded = createSelector(getDeedState, fromDeed.getIsLoaded);
export const getDeedIsDoing = createSelector(getDeedState, fromDeed.getIsDoing);
export const getIsSavingTestimony = createSelector(getDeedState, fromDeed.getIsSavingTestimony);
export const getDeeds = createSelector(getDeedState, fromDeed.getDeeds);
export const getCurrentDeed = createSelector(getDeedState, fromDeed.getCurrent);
export const getTestimony = createSelector(getDeedState, fromDeed.getTestimony);


/**
 * Feed state selectors
 */
export function getFeedState(state: State) { return state.feed; }
export const getCriteria = createSelector(getFeedState, fromFeed.getCriteria);
export const getFeedItems = createSelector(getFeedState, fromFeed.getFeedItems);
export const getFeedIsLoading = createSelector(getFeedState, fromFeed.getIsLoading);


/**
 * Group state selectors
 */
export function getGroupState(state: State) { return state.group; }
export const getCurrentGroup = createSelector(getGroupState, fromGroup.getCurrent);
export const getCurrentCampaign = createSelector(getGroupState, fromGroup.getCurrentCampaign);
export const getCurrentGroupTab = createSelector(getGroupState, fromGroup.getCurrentTab);


/**
 * Layout state selectors
 */
export function getLayoutState(state: State) { return state.layout; }
export const getIsMenuOpen = createSelector(getLayoutState, fromLayout.getIsMenuOpen);
export const getIsSmallScreen = createSelector(getLayoutState, fromLayout.getIsSmallScreen);
export const getNavbarSearchInput = createSelector(getLayoutState, fromLayout.getSearchInput);
export const getNavbarSearchResults = createSelector(getLayoutState, fromLayout.getSearchResults);


/**
 * Reset password state selectors
 */
export function getResetPassword(state: State) { return state.resetPassword; }


/**
 * Router state selectors
 */
export function getRouterPath(state: State) { return state.router.path; }


/**
 * User state selectors
 */
export function getUserState(state: State) { return state.user; }
export const getCurrentUser = createSelector(getUserState, fromUser.getCurrent);


/**
 * Modal state selectors
 */
export function getCampaignEditModal(state: State) { return state.modalCampaignEdit; }
export function getChangePasswordModal(state: State) { return state.modalChangePassword; }
export function getDeedPreviewModal(state: State) { return state.modalDeedPreview; }
export function getForgotPasswordModal(state: State) { return state.modalForgotPassword; }
export function getGroupEditModal(state: State) { return state.modalGroupEdit; }
export function getLoginModal(state: State) { return state.modalLogin; }
export function getSignupModal(state: State) { return state.modalSignup; }


/**
 * Control panel state selectors
 */
export function getGroupControlPanel(state: State) { return state.groupControlPanel; }
export function getGroupsControlPanel(state: State) { return state.groupsControlPanel; }
export function getUserControlPanel(state: State) { return state.userControlPanel; }
export function getUsersControlPanel(state: State) { return state.usersControlPanel; }


/**
 * Combined selectors
 */
export const getAuthUserCount = createSelector(
  getCountersState,
  getAuthUser,
  (counters: Counters, user: User) => user && counters[user._id],
);
export const getCurrentCampaignCount = createSelector(
  getCountersState,
  getCurrentCampaign,
  (counters: Counters, campaign: Campaign) => campaign && counters[campaign._id],
);
export const getCurrentDeedCount = createSelector(
  getCountersState,
  getCurrentDeed,
  (counters: Counters, deed: Deed) => deed && counters[deed._id],
);
export const getCurrentGroupCount = createSelector(
  getCountersState,
  getCurrentGroup,
  (counters: Counters, group: Group) => group && counters[group._id],
);
export const getCurrentUserCount = createSelector(
  getCountersState,
  getCurrentUser,
  (counters: Counters, user: User) => user && counters[user._id],
);
export const getControlPanelGroupCount = createSelector(
  getCountersState,
  getGroupControlPanel,
  (counters: Counters, state: fromGroupControlPanel.State) => state.group && counters[state.group._id],
);
