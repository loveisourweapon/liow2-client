import { AbstractControl, NgModel } from '@angular/forms';

import { SameAsValidatorDirective } from './same-as-validator.directive';

describe(`SameAsValidatorDirective`, () => {
  let directive: SameAsValidatorDirective;
  let otherControl: NgModel;

  beforeEach(() => {
    otherControl = <NgModel>{ value: '' };
    directive = new SameAsValidatorDirective();
    directive.validateSameAs = otherControl;
  });

  it(`should return null if input value is same as other control`, () => {
    const input = 'abc123';
    otherControl.value = input;
    const result = directive.validate(<AbstractControl>{ value: input });
    expect(result).toBeNull();
  });

  it(`should return { sameAs: true } if input value isn't the same as other control`, () => {
    otherControl.value = 'abc123';
    const result = directive.validate(<AbstractControl>{ value: 'def456' });
    expect(result).toEqual({ sameAs: true });
  });
});
