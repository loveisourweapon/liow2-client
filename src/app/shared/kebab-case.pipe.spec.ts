import { KebabCasePipe } from './kebab-case.pipe';

describe(`KebabCasePipe`, () => {
  const pipe = new KebabCasePipe();

  it(`should return '' for empty inputs`, () => {
    let result = pipe.transform(null);
    expect(result).toBe('');
    result = pipe.transform(undefined);
    expect(result).toBe('');
    result = pipe.transform('');
    expect(result).toBe('');
  });

  it(`should transform input string to kebab case`, () => {
    const testCases = [
      { input: 'foobar', expected: 'foobar' },
      { input: 'fooBar', expected: 'foo-bar' },
      { input: 'foo bar', expected: 'foo-bar' },
      { input: 'Foo Bar', expected: 'foo-bar' },
      { input: 'FOO BAR', expected: 'foo-bar' },
      { input: 'foo___bar ', expected: 'foo-bar' },
    ];

    testCases.forEach(testCase => {
      const result = pipe.transform(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });
});
