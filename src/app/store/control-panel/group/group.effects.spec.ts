import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GroupControlPanelEffects } from './index';
import { Group, GroupService } from '../../group';
import { UserService } from '../../user';
import * as groupControlPanel from './group.actions';
import * as act from '../../act/act.actions';
import { GroupStubService, UserStubService, takeAndScan } from '../../../../testing';

describe(`GroupControlPanelEffects`, () => {
  let runner: EffectsRunner;
  let groupControlPanelEffects: GroupControlPanelEffects;
  let groupService: GroupService;
  let userService: UserService;

  const groupId = 'abc123';

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          GroupControlPanelEffects,
          { provide: GroupService, useClass: GroupStubService },
          { provide: UserService, useClass: UserStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, GroupControlPanelEffects], (_runner, _groupControlPanelEffects) => {
    runner = _runner;
    groupControlPanelEffects = _groupControlPanelEffects;
    groupService = TestBed.get(GroupService);
    userService = TestBed.get(UserService);
  }));

  describe(`countMembers$`, () => {
    it(`should dispatch SET_NUMBER_OF_MEMBERS action after counting group members`, () => {
      const numberOfMembers = 2;
      const countSpy = spyOn(userService, 'count').and.returnValue(Observable.of(numberOfMembers));
      runner.queue(new groupControlPanel.FindAndSetGroupAction({ _id: groupId }));
      groupControlPanelEffects.countMembers$.subscribe((result: Action) => {
        expect(countSpy.calls.mostRecent().args[0]).toEqual({ groups: groupId });
        expect(result.type).toBe(groupControlPanel.ActionTypes.SET_NUMBER_OF_MEMBERS);
        expect(result.payload).toBe(numberOfMembers);
      });
    });

    it(`should dispatch COUNT_MEMBERS_FAIL action after failing to count group members`, () => {
      const error = { message: 'Test error' };
      const response = new Response(new ResponseOptions({ body: error }));
      spyOn(userService, 'count').and.returnValue(Observable.throw(response));
      runner.queue(new groupControlPanel.FindAndSetGroupAction({ _id: groupId }));
      groupControlPanelEffects.countMembers$.subscribe((result: Action) => {
        expect(result.type).toBe(groupControlPanel.ActionTypes.COUNT_MEMBERS_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`findAndSetGroup$`, () => {
    it(`should dispatch SET_GROUP and COUNT actions after finding group`, () => {
      const searchParams = { _id: groupId };
      const group = <Group>{ _id: groupId };
      const findSpy = spyOn(groupService, 'findOne').and.returnValue(Observable.of(group));
      runner.queue(new groupControlPanel.FindAndSetGroupAction(searchParams));
      takeAndScan(groupControlPanelEffects.findAndSetGroup$, 2)
        .subscribe((results: Action[]) => {
          expect(findSpy.calls.mostRecent().args[0]).toBe(searchParams);
          expect(results[0].type).toBe(groupControlPanel.ActionTypes.SET_GROUP);
          expect(results[0].payload).toBe(group);
          expect(results[1].type).toBe(act.ActionTypes.COUNT);
          expect(results[1].payload).toEqual({ group: group._id });
        });
    });

    it(`should dispatch FIND_AND_SET_GROUP_FAIL action after failing to find group`, () => {
      const error = { message: 'Test error' };
      const response = new Response(new ResponseOptions({ body: error }));
      spyOn(groupService, 'findOne').and.returnValue(Observable.throw(response));
      runner.queue(new groupControlPanel.FindAndSetGroupAction({ _id: groupId }));
      groupControlPanelEffects.findAndSetGroup$.subscribe((result: Action) => {
        expect(result.type).toBe(groupControlPanel.ActionTypes.FIND_AND_SET_GROUP_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });
});
