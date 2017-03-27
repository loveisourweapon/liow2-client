import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CampaignEditInitialise } from './campaign-edit.model';
import * as campaignEditModal from './campaign-edit.actions';
import { Deed, DeedService } from '../../deed';
import { DeedPublish } from '../../group';

@Injectable()
export class CampaignEditModalEffects {
  @Effect()
  loadDeeds$: Observable<Action> = this.actions$
    .ofType(campaignEditModal.ActionTypes.OPEN).map(toPayload)
    .flatMap((payload: CampaignEditInitialise) => this.deedService.find()
      .map((deeds: Deed[]) => deeds.map((deed: Deed) => <DeedPublish>{ deed }))
      .map((deeds: DeedPublish[]) => new campaignEditModal.UpdateDeedsAction(deeds)));

  constructor(
    private actions$: Actions,
    private deedService: DeedService,
  ) { }
}
