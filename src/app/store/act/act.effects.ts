import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ActService } from './act.service';
import * as act from './act.actions';

@Injectable()
export class ActEffects {
  @Effect()
  done$: Observable<Action> = this.actions$
    .ofType(act.ActionTypes.DONE)
    .flatMap((action: Action) => this.actService.done(action.payload.deed, action.payload.group)
      .mergeMap(() => Observable.from([
        new act.CountAction(),
        new act.CountAction({ deed: action.payload.deed._id }),
        // TODO: refresh feed?
        // new feed.LoadAction(),
        new act.DoneSuccessAction(),
      ])))
    .catch((error: Error) => Observable.of(new act.DoneFailAction(error.message)));

  constructor(
    private actions$: Actions,
    private actService: ActService,
  ) { }
}
