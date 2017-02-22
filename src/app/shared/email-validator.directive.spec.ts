import { AbstractControl } from '@angular/forms';

import { EmailValidatorDirective } from './email-validator.directive';

describe(`EmailValidatorDirective`, () => {
  let directive: EmailValidatorDirective;

  beforeEach(() => {
    directive = new EmailValidatorDirective();
  });

  it(`should return null for a valid email address`, () => {
    const input = 'foo@bar.com';
    const result = directive.validate(<AbstractControl>{ value: input });
    expect(result).toBeNull();
  });

  it(`should return { validEmail: true } for an invalid email address`, () => {
    const input = '';
    const result = directive.validate(<AbstractControl>{ value: input });
    expect(result).toEqual({ validEmail: true });
  });

  it(`should validate email addresses`, () => {
    const testCases = [
      { input: 'FOO@BAR.COM', isValid: true },
      { input: 'foo_bar@baz.com', isValid: true },
      { input: 'foo+bar@baz.com', isValid: true },
      { input: 'foo-bar@baz.com', isValid: true },
      { input: 'foo123@baz.com', isValid: true },
      { input: 'foo@bar.baz.com', isValid: true },
      { input: '', isValid: false },
      { input: null, isValid: false },
      { input: 'foobar', isValid: false },
      { input: '123456', isValid: false },
      { input: '  ', isValid: false },
    ];

    testCases.forEach((testCase) => {
      const result = directive.validate(<AbstractControl>{ value: testCase.input });
      if (testCase.isValid) {
        expect(result).toBeNull();
      } else {
        expect(result).toEqual({ validEmail: true });
      }
    });
  });
});
