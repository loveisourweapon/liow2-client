import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Group, GroupEffects, GroupService } from './index';
import * as act from '../act/act.actions';
import * as alertify from '../alertify/alertify.actions';
import * as auth from '../auth/auth.actions';
import * as group from './group.actions';
import { GroupStubService, takeAndScan } from '../../../testing';

describe(`GroupEffects`, () => {
  let runner: EffectsRunner;
  let groupEffects: GroupEffects;
  let groupService: GroupService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          GroupEffects,
          { provide: GroupService, useClass: GroupStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, GroupEffects], (_runner, _groupEffects) => {
    runner = _runner;
    groupEffects = _groupEffects;
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

  describe(`findAndSetCurrent$`, () => {
    it(`should dispatch SET_CURRENT and COUNT actions after finding current group`, () => {
      const foundGroup = <Group>{};
      spyOn(groupService, 'findOne').and.returnValue(Observable.of(foundGroup));
      runner.queue(new group.FindAndSetCurrentAction({}));
      takeAndScan(groupEffects.findAndSetCurrent$, 2)
        .subscribe((results: Action[]) => {
          expect(results[0].type).toBe(group.ActionTypes.SET_CURRENT);
          expect(results[0].payload).toBe(foundGroup);
          expect(results[1].type).toBe(act.ActionTypes.COUNT);
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
