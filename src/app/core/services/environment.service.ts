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
}
