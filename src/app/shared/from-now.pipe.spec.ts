import * as moment from 'moment';

import { FromNowPipe } from './from-now.pipe';

describe(`FromNowPipe`, () => {
  const pipe = new FromNowPipe();

  it(`returns 'a few seconds ago' if nothing provided`, () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('a few seconds ago');
  });

  it(`returns 'a few seconds ago' for new date`, () => {
    const result = pipe.transform(new Date());
    expect(result).toBe('a few seconds ago');
  });

  it(`converts date objects to relative date strings`, () => {
    const testCases = [
      { input: moment().subtract(20, 'second').toDate(), expected: 'a few seconds ago' },
      { input: moment().subtract(1, 'minute').toDate(), expected: 'a minute ago' },
      { input: moment().subtract(10, 'minute').toDate(), expected: '10 minutes ago' },
      { input: moment().subtract(1, 'hour').toDate(), expected: 'an hour ago' },
      { input: moment().subtract(1, 'day').toDate(), expected: 'a day ago' },
      { input: moment().subtract(1, 'week').toDate(), expected: '7 days ago' },
      { input: moment().add(1, 'day').toDate(), expected: 'in a day' },
    ];

    testCases.forEach(testCase => {
      const result = pipe.transform(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });

  it(`returns 'Invalid date' message if empty string provided`, () => {
    const result = pipe.transform('');
    expect(result).toBe('Invalid date');
  });
});
