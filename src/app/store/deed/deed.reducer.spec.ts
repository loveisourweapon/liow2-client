import { assign } from 'lodash';

import { Deed, initialState, reducer, State } from './index';
import * as act from '../act/act.actions';
import { NewComment } from '../comment';
import * as comment from '../comment/comment.actions';
import * as deed from './deed.actions';

describe(`deed reducer`, () => {
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

  it(`should set isSavingTestimony to true with COMMENT action`, () => {
    const state = reducer(initialState, new comment.CommentAction(<NewComment>{}));
    expect(state).not.toBe(initialState);
    expect(state.isSavingTestimony).toBe(true);
  });

  it(`should reset testimony and set isSavingTestimony to false with COMMENT_SUCCESS`, () => {
    const savingState = assign({}, initialState, { isSavingTestimony: true });
    const state = reducer(savingState, new comment.CommentSuccessAction());
    expect(state).not.toBe(savingState);
    expect(state.isSavingTestimony).toBe(false);
  });

  it(`should set isSavingTestimony to false and testimony with COMMENT_FAIL`, () => {
    const savingState = assign({}, initialState, { isSavingTestimony: true });
    const state = reducer(savingState, new comment.CommentFailAction());
    expect(state).not.toBe(savingState);
    expect(state.isSavingTestimony).toBe(false);
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

  it(`should set testimony with UPDATE_TESTIMONY action`, () => {
    const testimony = 'A testimony';
    const state = reducer(initialState, new deed.UpdateTestimonyAction(testimony));
    expect(state).not.toBe(initialState);
    expect(state.testimony).toBe(testimony);
  });
});
