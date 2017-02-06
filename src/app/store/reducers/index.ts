import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import { environment } from '../../../environments/environment';

import { Counters, Deed, Group, User } from '../models';
import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth';
import * as fromCounter from './counter';
import * as fromDeed from './deed';
import * as fromFeed from './feed';
import * as fromGroup from './group';
import * as fromLayout from './layout';
import * as fromLoginModal from './modal/login';
import * as fromUser from './user';

export interface State {
  auth: fromAuth.State;
  counters: fromCounter.State;
  deed: fromDeed.State;
  feed: fromFeed.State;
  group: fromGroup.State;
  layout: fromLayout.State;
  modalLogin: fromLoginModal.State;
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
  modalLogin: fromLoginModal.reducer,
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
export const getDeeds = createSelector(getDeedState, fromDeed.getDeeds);
export const getCurrentDeed = createSelector(getDeedState, fromDeed.getCurrent);


/**
 * Feed state selectors
 */
export function getFeedState(state: State) { return state.feed; }
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
export function getLoginModal(state: State) { return state.modalLogin; }


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
