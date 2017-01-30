import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService as Ng2AuthService } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { Credentials } from '../models';

@Injectable()
export class AuthService {
  constructor(
    private auth: Ng2AuthService,
  ) { }

  authenticateEmail(credentials: Credentials): Observable<string> {
    if (!(credentials.email && credentials.password)) {
      return Observable.throw(new Error(`Please provide email and password`));
    }

    return this.auth.login(credentials)
      .map((response: Response) => response.json() || {})
      .map((tokenReponse: { token: string }) => tokenReponse.token);
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }
}
