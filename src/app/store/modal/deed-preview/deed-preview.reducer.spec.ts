import { initialState, reducer } from './index';
import * as deedPreviewModal from './deed-preview.actions';
import { Deed } from '../../deed';

describe(`deed preview modal reducer`, () => {
  const deed = <Deed>{};

  it(`should set isOpen to false and reset deed with CLOSE action`, () => {
    const openState = { isOpen: true, deed };
    const state = reducer(openState, new deedPreviewModal.CloseAction());
    expect(state).not.toBe(openState);
    expect(state.isOpen).toBe(false);
    expect(state.deed).toBeNull();
  });

  it(`should set isOpen to true and deed property with OPEN action`, () => {
    const state = reducer(initialState, new deedPreviewModal.OpenAction(deed));
    expect(state).not.toBe(initialState);
    expect(state.isOpen).toBe(true);
    expect(state.deed).toBe(deed);
  });
});
