import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CampaignEditAction, CampaignEditModalEffects } from './index';
import * as campaignEditModal from './campaign-edit-modal.actions';
import { Group } from '../group';
import { Deed, DeedService } from '../deed';
import { DeedStubService, StoreStubService } from '../../../testing';

describe(`CampaignEditModalEffects`, () => {
  let runner: EffectsRunner;
  let campaignEditModalEffects: CampaignEditModalEffects;
  let deedService: DeedService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          CampaignEditModalEffects,
          { provide: DeedService, useClass: DeedStubService },
          { provide: Store, useClass: StoreStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, CampaignEditModalEffects], (_runner, _campaignEditModalEffects) => {
    runner = _runner;
    campaignEditModalEffects = _campaignEditModalEffects;
    deedService = TestBed.get(DeedService);
  }));

  describe(`loadDeeds$`, () => {
    it(`should fetch all deeds, map them to DeedPublish and dispatch UPDATE_DEEDS action`, () => {
      const action = CampaignEditAction.Create;
      const group = <Group>{ _id: 'abc123' };
      const deed = <Deed>{ _id: 'def456' };
      const deedSpy = spyOn(deedService, 'find').and.returnValue(Observable.of([deed]));
      runner.queue(new campaignEditModal.OpenAction({ action, group }));
      campaignEditModalEffects.loadDeeds$.subscribe((result: Action) => {
        expect(deedSpy).toHaveBeenCalled();
        expect(result.type).toBe(campaignEditModal.ActionTypes.UPDATE_DEEDS);
        expect(result.payload).toEqual([{ deed }]);
      });
    });
  });
});
