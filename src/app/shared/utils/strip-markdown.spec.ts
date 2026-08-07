import { stripMarkdown } from './strip-markdown';

describe(`stripMarkdown`, () => {
  it(`should return an empty string for empty input`, () => {
    expect(stripMarkdown('')).toBe('');
    expect(stripMarkdown(null)).toBe('');
    expect(stripMarkdown(undefined)).toBe('');
  });

  it(`should leave plain text alone`, () => {
    expect(stripMarkdown('Just some plain text.')).toBe('Just some plain text.');
  });

  it(`should strip inline syntax, keeping the prose`, () => {
    const testCases = [
      { input: '**bold** and _italic_', expected: 'bold and italic' },
      { input: '__bold__ and *italic*', expected: 'bold and italic' },
      { input: '~~struck~~ through', expected: 'struck through' },
      { input: 'a [link](https://example.com) here', expected: 'a link here' },
      { input: 'an ![image](https://example.com/a.png) here', expected: 'an here' },
      { input: 'some `code` inline', expected: 'some code inline' },
      { input: 'with <b>html</b> in it', expected: 'with html in it' },
    ];

    testCases.forEach((testCase) => {
      expect(stripMarkdown(testCase.input)).toBe(testCase.expected);
    });
  });

  it(`should strip line-level syntax and collapse the result to one line`, () => {
    const markdown = [
      '# Heading',
      '',
      '> A quote',
      '',
      '- first item',
      '- second item',
      '',
      '---',
      '',
      '1. numbered',
    ].join('\n');

    expect(stripMarkdown(markdown)).toBe('Heading A quote first item second item numbered');
  });

  it(`should keep the contents of a fenced code block`, () => {
    expect(stripMarkdown('```js\nconst a = 1;\n```')).toBe('const a = 1;');
  });

  it(`should not treat a mid-sentence hash or dash as syntax`, () => {
    expect(stripMarkdown('Ranked #1 for cost-effectiveness')).toBe(
      'Ranked #1 for cost-effectiveness'
    );
  });

  it(`should truncate on a word boundary`, () => {
    const result = stripMarkdown('one two three four five', 12);

    expect(result).toBe('one two…');
  });

  it(`should not truncate text within the limit`, () => {
    const text = 'short enough';

    expect(stripMarkdown(text, 12)).toBe(text);
  });

  it(`should hard clip a single word longer than the limit`, () => {
    expect(stripMarkdown('supercalifragilistic', 10)).toBe('supercalif…');
  });

  it(`should drop trailing punctuation left behind by truncating`, () => {
    expect(stripMarkdown('one two, three four', 10)).toBe('one two…');
  });
});
