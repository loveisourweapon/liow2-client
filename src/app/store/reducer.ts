import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import { environment } from '../../environments/environment';

import { Counters } from './act';
import { Deed } from './deed';
import { Group } from './group';
import { User } from './user';

import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth/auth.reducer';
import * as fromCounter from './act/counter.reducer';
import * as fromDeed from './deed/deed.reducer';
import * as fromFeed from './feed/feed.reducer';
import * as fromGroup from './group/group.reducer';
import * as fromLayout from './layout/layout.reducer';
import * as fromForgotPasswordModal from './forgot-password-modal/forgot-password-modal.reducer';
import * as fromLoginModal from './login-modal/login-modal.reducer';
import * as fromSignupModal from './signup-modal/signup-modal.reducer';
import * as fromUser from './user/user.reducer';

export interface State {
  auth: fromAuth.State;
  counters: fromCounter.State;
  deed: fromDeed.State;
  feed: fromFeed.State;
  group: fromGroup.State;
  layout: fromLayout.State;
  modalForgotPassword: fromForgotPasswordModal.State;
  modalLogin: fromLoginModal.State;
  modalSignup: fromSignupModal.State;
  router: fromRouter.RouterState;
  user: fromUser.State;
}

const reducers = {
  auth: fromAuth.reducer,
  counters: fromCounter.reducer,
  deed: fromDeed.reducer,
  feed: fromFeed.reducer,
  group: fromGroup.reducer,
  layout: fromLayout.reducer,
  modalForgotPassword: fromForgotPasswordModal.reducer,
  modalLogin: fromLoginModal.reducer,
  modalSignup: fromSignupModal.reducer,
  router: fromRouter.routerReducer,
  user: fromUser.reducer,
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
 * Auth state selectors
 */
export function getAuthState(state: State) { return state.auth; }
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
export const getAuthUser = createSelector(getAuthState, fromAuth.getUser);
export const getAuthGroup = createSelector(getAuthState, fromAuth.getGroup);


/**
 * Counters state selectors
 */
export function getCountersState(state: State) { return state.counters; }
export const getGlobalCount = createSelector(getCountersState, fromCounter.getGlobalCount);
export const getGroupsCount = createSelector(getCountersState, fromCounter.getGroupsCount);
export const getUsersCount = createSelector(getCountersState, fromCounter.getUsersCount);


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


/**
 * Layout state selectors
 */
export function getLayoutState(state: State) { return state.layout; }
export const getIsMenuOpen = createSelector(getLayoutState, fromLayout.getIsMenuOpen);


/**
 * Modal state selectors
 */
export function getForgotPasswordModal(state: State) { return state.modalForgotPassword; }
export function getLoginModal(state: State) { return state.modalLogin; }
export function getSignupModal(state: State) { return state.modalSignup; }


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
 * Combined selectors
 */
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
