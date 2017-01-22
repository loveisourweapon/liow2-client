/* tslint:disable:member-ordering */
import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { API_BASE_URL } from '../../core';
import { Deed } from '../models';
import * as deed from '../actions/deed';

@Injectable()
export class DeedEffects {
  private baseUrl: string;

  constructor(
    private actions$: Actions,
    private http: Http,
    @Inject(API_BASE_URL) apiBaseUrl: string,
  ) {
    this.baseUrl = `${apiBaseUrl}/deeds`;
  }

  @Effect()
  find$: Observable<Action> = this.actions$
    .ofType(deed.ActionTypes.FIND)
    .startWith(new deed.FindAction()) // trigger initial load on startup
    .switchMap(() =>
      this.http.get(this.baseUrl)
        .map((response: Response) => response.json() || [])
        .map((deeds: Deed[]) => new deed.FindSuccessAction(deeds))
        .catch(error => Observable.of(new deed.FindFailAction(error))));
}
