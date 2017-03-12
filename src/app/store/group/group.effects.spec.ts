import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Campaign, CampaignService, DeedPublish, Group, GroupEffects, GroupService } from './index';
import * as act from '../act/act.actions';
import * as alertify from '../alertify/alertify.actions';
import * as auth from '../auth/auth.actions';
import { Deed } from '../deed';
import * as group from './group.actions';
import { CampaignStubService, GroupStubService, takeAndScan } from '../../../testing';

describe(`GroupEffects`, () => {
  let runner: EffectsRunner;
  let groupEffects: GroupEffects;
  let campaignService: CampaignService;
  let groupService: GroupService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          GroupEffects,
          { provide: CampaignService, useClass: CampaignStubService },
          { provide: GroupService, useClass: GroupStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, GroupEffects], (_runner, _groupEffects) => {
    runner = _runner;
    groupEffects = _groupEffects;
    campaignService = TestBed.get(CampaignService);
    groupService = TestBed.get(GroupService);
  }));

  describe(`count$`, () => {
    it(`should dispatch COUNT_SUCCESS after counting all groups`, () => {
      const counter = 0;
      const countSpy = spyOn(groupService, 'count').and.returnValue(Observable.of(counter));
      runner.queue(new group.CountAction());
      groupEffects.count$.subscribe((result: Action) => {
        expect(countSpy).toHaveBeenCalled();
        expect(result.type).toBe(group.ActionTypes.COUNT_SUCCESS);
        expect(result.payload).toBe(counter);
      });
    });

    it(`should dispatch COUNT_FAIL after failing to count all groups`, () => {
      const error = {};
      spyOn(groupService, 'count').and.returnValue(Observable.throw(error));
      runner.queue(new group.CountAction());
      groupEffects.count$.subscribe((result: Action) => {
        expect(result.type).toBe(group.ActionTypes.COUNT_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`create$`, () => {
    const setupCampaign = true;
    const newGroup = {
      name: 'Test group name',
      welcomeMessage: 'Test **welcome** message',
      admins: [],
    };

    it(`should dispatch CREATE_SUCCESS, LOGIN_WITH_TOKEN and SET_CURRENT_GROUP actions after saving new group`, () => {
      const saveSpy = spyOn(groupService, 'save').and.returnValue(Observable.of(newGroup));
      runner.queue(new group.CreateAction({ group: newGroup, setupCampaign }));
      takeAndScan(groupEffects.create$, 4)
        .subscribe((results: Action[]) => {
          expect(saveSpy).toHaveBeenCalledWith(newGroup);
          expect(results[0].type).toBe(group.ActionTypes.CREATE_SUCCESS);
          expect(results[1].type).toBe(auth.ActionTypes.LOGIN_WITH_TOKEN);
          expect(results[2].type).toBe(auth.ActionTypes.SET_CURRENT_GROUP);
          expect(results[3].type).toBe(alertify.ActionTypes.SUCCESS);
        });
    });

    it(`should dispatch CREATE_FAIL action after failing to save group`, () => {
      const error = { errors: {}, message: 'Test error' };
      const response = new Response(new ResponseOptions({ body: { error } }));
      spyOn(groupService, 'save').and.returnValue(Observable.throw(response));
      runner.queue(new group.CreateAction({ group: newGroup, setupCampaign }));
      groupEffects.create$.subscribe((result: Action) => {
        expect(result.type).toBe(group.ActionTypes.CREATE_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`createCampaign$`, () => {
    const newCampaign = {
      group: 'abc123',
      deeds: [{ deed: 'def456' }],
    };

    it(`should dispatch CREATE_CAMPAIGN_SUCCESS and SET_CURRENT_CAMPAIGN actions after saving campaign`, () => {
      const saveSpy = spyOn(campaignService, 'save').and.returnValue(Observable.of(newCampaign));
      runner.queue(new group.CreateCampaignAction(newCampaign));
      takeAndScan(groupEffects.createCampaign$, 3)
        .subscribe((results: Action[]) => {
          expect(saveSpy).toHaveBeenCalledWith(newCampaign);
          expect(results[0].type).toBe(group.ActionTypes.CREATE_CAMPAIGN_SUCCESS);
          expect(results[0].payload).toBe(newCampaign);
          expect(results[1].type).toBe(group.ActionTypes.FIND_AND_SET_CURRENT_CAMPAIGN);
          expect(results[1].payload.group).toBe(newCampaign.group);
          expect(results[2].type).toBe(alertify.ActionTypes.SUCCESS);
          expect(results[2].payload).toBe(`Created campaign`);
        });
    });

    it(`should dispatch CREATE_CAMPAIGN_FAIL action after failing to save campaign`, () => {
      const error = { errors: {}, message: 'Test error' };
      const response = new Response(new ResponseOptions({ body: { error } }));
      spyOn(campaignService, 'save').and.returnValue(Observable.throw(response));
      runner.queue(new group.CreateCampaignAction(newCampaign));
      groupEffects.createCampaign$.subscribe((result: Action) => {
        expect(result.type).toBe(group.ActionTypes.CREATE_CAMPAIGN_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`findAndSetCurrent$`, () => {
    it(`should dispatch SET_CURRENT and FIND_AND_SET_CURRENT_CAMPAIGN and COUNT actions after finding group`, () => {
      const foundGroup = <Group>{ _id: 'abc123' };
      spyOn(groupService, 'findOne').and.returnValue(Observable.of(foundGroup));
      runner.queue(new group.FindAndSetCurrentAction({}));
      takeAndScan(groupEffects.findAndSetCurrent$, 3)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(group.ActionTypes.SET_CURRENT);
          expect(results[0].payload).toBe(foundGroup);
          expect(results[1].type).toBe(group.ActionTypes.FIND_AND_SET_CURRENT_CAMPAIGN);
          expect(results[1].payload.group).toBe(foundGroup._id);
          expect(results[2].type).toBe(act.ActionTypes.COUNT);
        });
    });

    it(`should dispatch FIND_AND_SET_CURRENT_FAIL after failing to find current group`, () => {
      const errorMessage = 'Test error';
      spyOn(groupService, 'findOne').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new group.FindAndSetCurrentAction({}));
      groupEffects.findAndSetCurrent$.subscribe((result: Action) => {
        expect(result.type).toBe(group.ActionTypes.FIND_AND_SET_CURRENT_FAIL);
        expect(result.payload).toBe(errorMessage);
      });
    });
  });

  describe(`findAndSetCurrentCampaign$`, () => {
    it(`should dispatch SET_CURRENT_CAMPAIGN action after finding campaign`, () => {
      const foundCampaign = <Campaign>{ _id: 'abc123' };
      spyOn(campaignService, 'findOne').and.returnValue(Observable.of(foundCampaign));
      runner.queue(new group.FindAndSetCurrentCampaignAction({}));
      groupEffects.findAndSetCurrentCampaign$.subscribe((result: Action) => {
        expect(result.type).toBe(group.ActionTypes.SET_CURRENT_CAMPAIGN);
        expect(result.payload).toBe(foundCampaign);
      });
    });

    it(`should dispatch FIND_AND_SET_CURRENT_CAMPAIGN_FAIL after failing to find campaign`, () => {
      const errorMessage = 'Test error';
      spyOn(campaignService, 'findOne').and.returnValue(Observable.throw(new Error(errorMessage)));
      runner.queue(new group.FindAndSetCurrentCampaignAction({}));
      groupEffects.findAndSetCurrentCampaign$.subscribe((result: Action) => {
        expect(result.type).toBe(group.ActionTypes.FIND_AND_SET_CURRENT_CAMPAIGN_FAIL);
        expect(result.payload).toBe(errorMessage);
      });
    });
  });

  describe(`finishCampaign$`, () => {
    const testCampaign = <Campaign>{ _id: 'abc123' };

    it(`should generate properly formed JsonPatch objects`, () => {
      const updateSpy = spyOn(campaignService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new group.FinishCampaignAction(testCampaign));
      groupEffects.finishCampaign$.take(1).subscribe(() => {
        const patches = updateSpy.calls.mostRecent().args[1];
        expect(patches[0].op).toBe('replace');
        expect(patches[0].path).toBe(`/active`);
        expect(patches[0].value).toBe(false);
        expect(patches[1].op).toBe('replace');
        expect(patches[1].path).toBe(`/dateEnd`);
        expect(patches[1].value instanceof Date).toBe(true);
      });
    });

    it(`should dispatch SET_CURRENT_CAMPAIGN and alertify SUCCESS actions after updating campaign`, () => {
      spyOn(campaignService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new group.FinishCampaignAction(testCampaign));
      takeAndScan(groupEffects.finishCampaign$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(group.ActionTypes.SET_CURRENT_CAMPAIGN);
          expect(results[0].payload).toBeNull();
          expect(results[1].type).toBe(alertify.ActionTypes.SUCCESS);
          expect(results[1].payload).toMatch(`Finished campaign`);
        });
    });

    it(`should dispatch alertify ERROR action after failing to update campaign`, () => {
      spyOn(campaignService, 'update').and.returnValue(Observable.throw({}));
      runner.queue(new group.FinishCampaignAction(testCampaign));
      groupEffects.finishCampaign$.subscribe((result: Action) => {
        expect(result.type).toBe(alertify.ActionTypes.ERROR);
        expect(result.payload).toMatch(`Failed finishing campaign`);
      });
    });
  });

  describe(`setDeedPublished$`, () => {
    const deed = <Deed>{ _id: 'abc123' };
    const campaign = <Campaign>{
      _id: 'def456',
      group: 'ghi789',
      deeds: [<DeedPublish>{ deed: deed, published: false }] };
    const isPublished = true;

    it(`should generate a properly formed JsonPatch object`, () => {
      const updateSpy = spyOn(campaignService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new group.SetDeedPublishedAction({ campaign, deed, isPublished }));
      groupEffects.setDeedPublished$.take(1).subscribe(() => {
        const patch = updateSpy.calls.mostRecent().args[1][0];
        expect(patch.op).toBe('replace');
        expect(patch.path).toBe(`/deeds/0/published`);
        expect(patch.value).toBe(isPublished);
      });
    });

    it(`should dispatch FIND_AND_SET_CURRENT_CAMPAIGN and alertify SUCCESS actions after updating campaign`, () => {
      spyOn(campaignService, 'update').and.returnValue(Observable.of({}));
      runner.queue(new group.SetDeedPublishedAction({ campaign, deed, isPublished }));
      takeAndScan(groupEffects.setDeedPublished$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(group.ActionTypes.FIND_AND_SET_CURRENT_CAMPAIGN);
          expect(results[0].payload.group).toBe(campaign.group);
          expect(results[1].type).toBe(alertify.ActionTypes.SUCCESS);
          expect(results[1].payload).toMatch(/^Published deed/);
        });
    });

    it(`should dispatch alertify ERROR action after failing to update campaign`, () => {
      spyOn(campaignService, 'update').and.returnValue(Observable.throw({}));
      runner.queue(new group.SetDeedPublishedAction({ campaign, deed, isPublished }));
      groupEffects.setDeedPublished$.subscribe((result: Action) => {
        expect(result.type).toBe(alertify.ActionTypes.ERROR);
        expect(result.payload).toMatch(/^Failed Publishing deed/);
      });
    });
  });

  describe(`update$`, () => {
    const updatedGroup = <Group>{
      _id: 'abc123',
      name: 'Test group name',
      welcomeMessage: 'Test **welcome** message',
      admins: [],
    };

    it(`should dispatch UPDATE_SUCCESS, SET_CURRENT and alertify SUCCESS actions after saving new group`, () => {
      const saveSpy = spyOn(groupService, 'save').and.returnValue(Observable.of(updatedGroup));
      runner.queue(new group.UpdateAction(updatedGroup));
      takeAndScan(groupEffects.update$, 3)
        .subscribe((results: Action[]) => {
          expect(saveSpy).toHaveBeenCalledWith(updatedGroup);
          expect(results[0].type).toBe(group.ActionTypes.UPDATE_SUCCESS);
          expect(results[0].payload).toBe(updatedGroup);
          expect(results[1].type).toBe(group.ActionTypes.SET_CURRENT);
          expect(results[1].payload).toBe(updatedGroup);
          expect(results[2].type).toBe(alertify.ActionTypes.SUCCESS);
          expect(results[2].payload).toMatch(/^Updated group/);
        });
    });

    it(`should dispatch UPDATE_FAIL action after failing to save group`, () => {
      const error = { errors: {}, message: 'Test error' };
      const response = new Response(new ResponseOptions({ body: { error } }));
      spyOn(groupService, 'save').and.returnValue(Observable.throw(response));
      runner.queue(new group.UpdateAction(updatedGroup));
      groupEffects.update$.subscribe((result: Action) => {
        expect(result.type).toBe(group.ActionTypes.UPDATE_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });
});
