import { CustomConfig } from 'ng2-ui-auth';

import { environment } from '../../environments/environment';

export class AuthConfig extends CustomConfig {
  tokenName = 'auth.token';
  tokenPrefix = 'liow';
  loginUrl = `${environment.apiBaseUrl}/auth/login`;
  signupUrl = `${environment.apiBaseUrl}/auth/signup`;
  defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  providers = {
    facebook: {
      clientId: environment.facebookClientId,
      url: `${environment.apiBaseUrl}/auth/facebook`,
    },
  };
}
