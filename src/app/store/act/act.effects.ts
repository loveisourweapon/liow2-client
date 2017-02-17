import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ActService } from './act.service';
import * as act from './act.actions';
import * as alertify from '../alertify/alertify.actions';
import { Deed } from '../deed';
import { Group } from '../group';

@Injectable()
export class ActEffects {
  @Effect()
  done$: Observable<Action> = this.actions$
    .ofType(act.ActionTypes.DONE).map(toPayload)
    .flatMap((payload: { deed: Deed, group: Group }) => this.actService.done(payload.deed, payload.group)
      .mergeMap(() => Observable.from([
        new act.CountAction(),
        new act.CountAction({ deed: payload.deed._id }),
        // TODO: refresh feed?
        // new feed.LoadAction(),
        new act.DoneSuccessAction(),
        new alertify.SuccessAction(`Deed done!`),
      ]))
      .catch((error: Error) => Observable.from([
        new act.DoneFailAction(error.message),
        new alertify.ErrorAction(`Failed registering deed`),
      ])));

  constructor(
    private actions$: Actions,
    private actService: ActService,
  ) { }
}
