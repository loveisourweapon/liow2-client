import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import { environment } from '../../../environments/environment';

import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth';
import * as fromLayout from './layout';

export interface State {
  auth: fromAuth.State;
  layout: fromLayout.State;
  router: fromRouter.RouterState;
}

const reducers = {
  auth: fromAuth.reducer,
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

export function getLayoutState(state: State) { return state.layout; }
export const getIsMenuOpen = createSelector(getLayoutState, fromLayout.getIsMenuOpen);
