import { ActionReducer, combineReducers } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import { authReducer, AuthState } from './auth.reducer';
import { layoutReducer, LayoutState } from './layout.reducer';

export interface AppState {
  auth: AuthState;
  layout: LayoutState;
  router: RouterState;
}

const reducers = {
  auth: authReducer,
  layout: layoutReducer,
  router: routerReducer,
};

export function appReducer(state: any, action: any): ActionReducer<AppState> {
  return combineReducers(reducers)(state, action);
}

export { AuthState } from './auth.reducer';
export { LayoutState } from './layout.reducer';
