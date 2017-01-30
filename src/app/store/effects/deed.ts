import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Deed } from '../models';
import { DeedService } from '../services';
import * as deed from '../actions/deed';

@Injectable()
export class DeedEffects {
  @Effect()
  find$: Observable<Action> = this.actions$
    .ofType(deed.ActionTypes.FIND)
    .startWith(new deed.FindAction()) // dispatch on startup
    .switchMap((action: Action) =>
      this.deedService.find(action.payload)
        .map((deeds: Deed[]) => new deed.FindSuccessAction(deeds))
        .catch(error => Observable.of(new deed.FindFailAction(error))));

  constructor(
    private actions$: Actions,
    private deedService: DeedService,
  ) { }
}
