import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import { environment } from '../../../environments/environment';

import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth';
import * as fromDeed from './deed';
import * as fromGroup from './group';
import * as fromLayout from './layout';
import * as fromLoginModal from './modal/login';

export interface State {
  auth: fromAuth.State;
  deed: fromDeed.State;
  group: fromGroup.State;
  layout: fromLayout.State;
  modalLogin: fromLoginModal.State;
  router: fromRouter.RouterState;
}

const reducers = {
  auth: fromAuth.reducer,
  deed: fromDeed.reducer,
  group: fromGroup.reducer,
  layout: fromLayout.reducer,
  modalLogin: fromLoginModal.reducer,
  router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any): State {
  return environment.production
    ? productionReducer(state, action)
    : developmentReducer(state, action)
    ;
}

export function getAuthState(state: State) { return state.auth; }
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
export const getAuthUser = createSelector(getAuthState, fromAuth.getUser);
export const getAuthGroup = createSelector(getAuthState, fromAuth.getGroup);

export function getDeedState(state: State) { return state.deed; }
export const getDeedIsLoading = createSelector(getDeedState, fromDeed.getIsLoading);
export const getDeedIsLoaded = createSelector(getDeedState, fromDeed.getIsLoaded);
export const getDeeds = createSelector(getDeedState, fromDeed.getDeeds);
export const getCurrentDeed = createSelector(getDeedState, fromDeed.getCurrent);

export function getGroupState(state: State) { return state.group; }
export const getCurrentGroup = createSelector(getGroupState, fromGroup.getCurrent);

export function getLayoutState(state: State) { return state.layout; }
export const getIsMenuOpen = createSelector(getLayoutState, fromLayout.getIsMenuOpen);

export function getLoginModal(state: State) { return state.modalLogin; }
