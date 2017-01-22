import { OpaqueToken } from '@angular/core';

import { environment } from '../../environments/environment';

export const API_BASE_URL = new OpaqueToken('ApiBaseUrl');

export function apiBaseUrlFactory(): string {
  return environment.production ?
    'https://api.loveisourweapon.com' :
    'http://localhost:3001';
}
