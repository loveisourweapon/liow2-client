import { LastPipe } from './last.pipe';

describe(`LastPipe`, () => {
  const pipe = new LastPipe();

  it(`should return undefined for empty arrays`, () => {
    const result = pipe.transform([]);
    expect(result).toBeUndefined();
  });

  it(`should return the item for a single item array`, () => {
    const item = 'test item';
    const result = pipe.transform([item]);
    expect(result).toBe(item);
  });

  it(`should return the last item of an array`, () => {
    const testCases = [
      { input: ['one', 'two'], expected: 'two' },
      { input: [1, 2, 3], expected: 3 },
    ];

    testCases.forEach(testCase => {
      const result = pipe.transform<any>(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });
});
