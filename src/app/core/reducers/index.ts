import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import { environment } from '../../../environments/environment';

import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth';
import * as fromDeed from './deed';
import * as fromLayout from './layout';

export interface State {
  auth: fromAuth.State;
  deed: fromDeed.State;
  layout: fromLayout.State;
  router: fromRouter.RouterState;
}

const reducers = {
  auth: fromAuth.reducer,
  deed: fromDeed.reducer,
  layout: fromLayout.reducer,
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

export function getDeedState(state: State) { return state.deed; }
export const getDeedIsLoading = createSelector(getDeedState, fromDeed.getIsLoading);
export const getDeedIsLoaded = createSelector(getDeedState, fromDeed.getIsLoaded);
export const getDeeds = createSelector(getDeedState, fromDeed.getDeeds);

export function getLayoutState(state: State) { return state.layout; }
export const getIsMenuOpen = createSelector(getLayoutState, fromLayout.getIsMenuOpen);
