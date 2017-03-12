import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CounterResult, DeedCounterResult } from './index';
import { ActService } from './act.service';
import * as act from './act.actions';
import { DeedService } from '../deed';
import * as deed from '../deed/deed.actions';

@Injectable()
export class CounterEffects {
  @Effect()
  count$: Observable<Action> = this.actions$
    .ofType(act.ActionTypes.COUNT)
    .startWith(new act.CountAction()) // dispatch global count on startup
    .flatMap((action: Action) => this.actService.count(action.payload)
      .map((counter: CounterResult) => new act.CountSuccessAction(counter))
      .catch((error: Error) => Observable.of(new act.CountFailAction(error.message))));

  @Effect()
  allDeedCounters$: Observable<Action> = this.actions$
    .ofType(deed.ActionTypes.ALL_COUNTERS)
    .startWith(new deed.AllCountersAction()) // dispatch on startup
    .flatMap(() => this.deedService.countAll()
      .map((counters: DeedCounterResult[]) => new deed.AllCountersSuccessAction(counters))
      .catch((error: Error) => Observable.of(new deed.AllCountersFailAction(error.message))));

  constructor(
    private actions$: Actions,
    private actService: ActService,
    private deedService: DeedService,
  ) { }
}
