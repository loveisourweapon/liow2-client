const DEFAULT_MAX_LENGTH = 200;

/**
 * Flatten Markdown to plain text, for use in meta tag content.
 *
 * Deed content and group welcome messages are Markdown, rendered by <ui-marked>. Share
 * card descriptions need the prose without the syntax, short enough that crawlers won't
 * truncate it mid-word themselves.
 *
 * @param markdown the Markdown source
 * @param maxLength the length to truncate to, on a word boundary
 */
export function stripMarkdown(markdown: string, maxLength = DEFAULT_MAX_LENGTH): string {
  if (!markdown) {
    return '';
  }

  const text = markdown
    // Fenced and inline code, keeping whatever was inside
    .replace(/```[^\n]*\n([\s\S]*?)```/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    // Images before links - an image is a link with a leading '!'
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Headings and blockquotes, only at the start of a line
    .replace(/^[ \t]*#{1,6}[ \t]+/gm, '')
    .replace(/^[ \t]*>[ \t]?/gm, '')
    // Horizontal rules before list markers, so a spaced rule like '- - -' isn't first
    // mistaken for a list item and left behind as stray dashes
    .replace(/^[ \t]*(?:[-*_][ \t]*){3,}$/gm, '')
    .replace(/^[ \t]*(?:[-*+]|\d+\.)[ \t]+/gm, '')
    // Bold, italic and strikethrough
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    // Any HTML that was mixed in
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return truncate(text, maxLength);
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(' ');

  // A single word longer than maxLength has no space to break on, so hard clip it
  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(/[,;:.!?-]+$/, '')}…`;
}
