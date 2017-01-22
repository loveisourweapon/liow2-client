import * as deed from '../actions/deed';
import * as fromDeed from './deed';

describe('deed reducer', () => {
  const initialState: fromDeed.State = {
    isLoading: false,
    isLoaded: false,
    deeds: [],
  };

  it(`should set isLoading to true with FIND action`, () => {
    const state = fromDeed.reducer(initialState, new deed.FindAction());
    expect(state.isLoading).toBe(true);
    expect(state.isLoaded).toBe(initialState.isLoaded);
    expect(state.deeds).toBe(initialState.deeds);
  });

  it(`should set deeds to payload with FIND_SUCCESS action`, () => {
    const payload = [];
    const state = fromDeed.reducer(initialState, new deed.FindSuccessAction(payload));
    expect(state.isLoading).toBe(false);
    expect(state.isLoaded).toBe(true);
    expect(state.deeds).toBe(payload);
  });

  it(`should set isLoading to false with FIND_FAIL action`, () => {
    const loadingState = Object.assign({}, initialState, { isLoading: true });
    const state = fromDeed.reducer(loadingState, new deed.FindFailAction(new Error()));
    expect(state.isLoading).toBe(false);
    expect(state.isLoaded).toBe(loadingState.isLoaded);
    expect(state.deeds).toBe(loadingState.deeds);
  });
});
