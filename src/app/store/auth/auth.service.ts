import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { AuthService as Ng2AuthService, JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Credentials } from './index';

@Injectable()
export class AuthService {
  private baseUrl: string;

  constructor(
    private auth: Ng2AuthService,
    private http: JwtHttp,
  ) {
    this.baseUrl = `${environment.apiBaseUrl}/auth`;
  }

  authenticateEmail(credentials: Credentials): Observable<string> {
    if (!(credentials.email && credentials.password)) {
      return Observable.throw(new Error(`Please provide email and password`));
    }

    return this.auth.login(credentials)
      .map((response: Response) => response.json() || {})
      .map((tokenReponse: { token: string }) => tokenReponse.token)
      .catch((response: Response) => {
        throw response.json().message;
      });
  }

  authenticateFacebook(userData?: { group: string }): Observable<string> {
    return this.auth.authenticate('facebook', userData)
      .map((response: Response) => response.json() || {})
      .map((tokenReponse: { token: string }) => tokenReponse.token);
  }

  confirmEmail(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirm`, { token })
      .map((response: Response) => response.json() || {});
  }

  sendConfirmEmail(emailAddress: string): Observable<any> {
    const search = new URLSearchParams();
    search.set('email', emailAddress);

    return this.http.get(`${this.baseUrl}/confirm`, { search })
      .map((response: Response) => response.json() || {});
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): Observable<void> {
    return this.auth.logout();
  }
}
