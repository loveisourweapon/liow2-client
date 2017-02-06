import * as moment from 'moment';

import { MomentPipe } from './moment.pipe';

describe(`MomentPipe`, () => {
  const pipe = new MomentPipe();
  const date = new Date();

  beforeEach(() => {
    // Prevent console warnings
    spyOn(window.console, 'warn');
  });

  it(`returns a default moment formatted date when no format specified`, () => {
    const result = pipe.transform(date);
    expect(result).toBe(moment(date).format());
  });

  it(`should format the provided date using the provided format specification`, () => {
    const testCases = [
      'ddd, D MMM YYYY [at] HH:mm',
      'ddd, hA',
    ];

    testCases.forEach(testCase => {
      const result = pipe.transform(date, testCase);
      expect(result).toBe(moment(date).format(testCase));
    });
  });

  it(`returns 'Invalid date' message if empty or invalid string provided`, () => {
    let result = pipe.transform('');
    expect(result).toBe('Invalid date');

    result = pipe.transform('foobar');
    expect(result).toBe('Invalid date');
  });
});
