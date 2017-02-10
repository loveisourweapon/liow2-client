import * as act from '../actions/act';
import * as deed from '../actions/deed';
import * as group from '../actions/group';
import * as user from '../actions/user';
import * as fromCounter from './counter';

describe(`counters reducer`, () => {
  const initialState: fromCounter.State = { };

  it(`should store the counterId/count pair as key/value after act.COUNT_SUCCESS action`, () => {
    const counterResult = { counterId: 'abc123', count: 123 };
    const state = fromCounter.reducer(initialState, new act.CountSuccessAction(counterResult));
    expect(state).not.toBe(initialState);
    expect(state[counterResult.counterId]).toBe(counterResult.count);
  });

  it(`should store each deedId/count pair as key/value after deed.ALL_COUNTERS_SUCCESS action`, () => {
    const deedCounterResults = [
      { deed: 'abc123', count: 123 },
      { deed: 'def456', count: 456 },
    ];
    const state = fromCounter.reducer(initialState, new deed.AllCountersSuccessAction(deedCounterResults));
    expect(state).not.toBe(initialState);
    deedCounterResults.forEach(deedCounterResult => {
      expect(state[deedCounterResult.deed]).toBe(deedCounterResult.count);
    });
  });

  it(`should store the groups count under 'groups' property after group.COUNT_SUCCESS action`, () => {
    const count = 123;
    const state = fromCounter.reducer(initialState, new group.CountSuccessAction(count));
    expect(state).not.toBe(initialState);
    expect(state['groups']).toBe(count);
  });

  it(`should store the users count under 'users' property after users.COUNT_SUCCESS action`, () => {
    const count = 123;
    const state = fromCounter.reducer(initialState, new user.CountSuccessAction(count));
    expect(state).not.toBe(initialState);
    expect(state['users']).toBe(count);
  });
});