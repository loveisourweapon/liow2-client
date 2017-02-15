import { assign } from 'lodash';

import { Deed, reducer, State } from './index';
import * as act from '../act/act.actions';
import * as deed from './deed.actions';

describe(`deed reducer`, () => {
  const initialState: State = {
    isLoading: false,
    isLoaded: false,
    isDoing: false,
    deeds: [],
    current: null,
  };

  it(`should set isDoing to true with DONE action`, () => {
    const deed = <Deed>{};
    const state = reducer(initialState, new act.DoneAction({ deed }));
    expect(state).not.toBe(initialState);
    expect(state.isDoing).toBe(true);
  });

  it(`should set isDoing to false with DONE_SUCCESS and DONE_FAIL actions`, () => {
    const doingState = assign({}, initialState, { isDoing: true });
    let state = reducer(doingState, new act.DoneSuccessAction());
    expect(state).not.toBe(doingState);
    expect(state.isDoing).toBe(false);

    state = reducer(doingState, new act.DoneFailAction(''));
    expect(state).not.toBe(doingState);
    expect(state.isDoing).toBe(false);
  });

  it(`should set isLoading to true with FIND_ALL action`, () => {
    const state = reducer(initialState, new deed.FindAllAction());
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(true);
  });

  it(`should set deeds to payload with FIND_ALL_SUCCESS action`, () => {
    const payload = [];
    const state = reducer(initialState, new deed.FindAllSuccessAction(payload));
    expect(state).not.toBe(initialState);
    expect(state.isLoading).toBe(false);
    expect(state.isLoaded).toBe(true);
    expect(state.deeds).toBe(payload);
  });

  it(`should set isLoading to false with FIND_ALL_FAIL action`, () => {
    const errorMessage = 'Test error';
    const loadingState = assign({}, initialState, { isLoading: true });
    const state = reducer(loadingState, new deed.FindAllFailAction(errorMessage));
    expect(state).not.toBe(loadingState);
    expect(state.isLoading).toBe(false);
  });

  it(`should clear current group with FIND_AND_SET_CURRENT action`, () => {
    const deedState = <State>{ current: <Deed>{} };
    const state = reducer(deedState, new deed.FindAndSetCurrentAction({}));
    expect(state).not.toBe(deedState);
    expect(state.current).toBeNull();
  });

  it(`should set current deed with SET_CURRENT action`, () => {
    const currentDeed = <Deed>{};
    const state = reducer(initialState, new deed.SetCurrentAction(currentDeed));
    expect(state).not.toBe(initialState);
    expect(state.current).toBe(currentDeed);
  });
});
