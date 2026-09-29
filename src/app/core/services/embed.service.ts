import { Injectable } from '@angular/core';

/**
 * Embedded mode (`?embed=1`) is used when a page is opened in the mobile app's in-app browser.
 * The flag is read once at startup so it survives in-app navigation, which drops the query string.
 */
@Injectable()
export class EmbedService {
  readonly embedded = new URLSearchParams(window.location.search).get('embed') === '1';
}
