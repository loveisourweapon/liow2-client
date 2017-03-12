import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Deed } from './index';
import { DeedService } from './deed.service';
import * as deed from './deed.actions';

@Injectable()
export class DeedEffects {
  @Effect()
  findAll$: Observable<Action> = this.actions$
    .ofType(deed.ActionTypes.FIND_ALL)
    .startWith(new deed.FindAllAction()) // dispatch on startup
    .flatMap(() => this.deedService.find()
      .map((deeds: Deed[]) => new deed.FindAllSuccessAction(deeds))
      .catch(error => Observable.of(new deed.FindAllFailAction(error.message))));

  @Effect()
  findAndSetCurrent$: Observable<Action> = this.actions$
    .ofType(deed.ActionTypes.FIND_AND_SET_CURRENT)
    .flatMap((action: Action) => this.deedService.findOne(action.payload)
      .map((foundDeed: Deed) => new deed.SetCurrentAction(foundDeed))
      .catch(error => Observable.of(new deed.FindAndSetCurrentFailAction(error.message))));

  constructor(
    private actions$: Actions,
    private deedService: DeedService,
  ) { }
}
