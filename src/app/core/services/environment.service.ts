import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class EnvironmentService {
  readonly production = environment.production;
  readonly apiBaseUrl = environment.apiBaseUrl;
  readonly appId = environment.appEnv.split('-')[0];
  readonly appEnv = environment.appEnv;
  readonly appName = environment.appName;
  readonly appNameLong = environment.appNameLong;
  readonly appNameShort = environment.appNameShort;
  readonly facebookClientId = environment.facebookClientId;
  readonly resourcePackUrl = environment.resourcePackUrl;
  readonly sentry = environment.sentry;

  // Set when a page is opened with `?embed=1` (e.g. in the mobile app's in-app browser).
  // Read once at startup so it survives in-app navigation, which drops the query string.
  readonly embedded = new URLSearchParams(window.location.search).get('embed') === '1';

  // Deed comments are testimonies on LIOW and impact stories on BeKind
  readonly storyLabel = this.appId === 'liow' ? 'testimony' : 'impact story';
  readonly storiesLabel = this.appId === 'liow' ? 'testimonies' : 'stories of impact';
}
