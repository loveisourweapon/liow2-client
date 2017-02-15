import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Group, GroupEffects, GroupService } from './index';
import * as act from '../act/act.actions';
import * as group from './group.actions';
import { GroupStubService } from '../../../testing';

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

  describe(`findAndSetCurrent$`, () => {
    it(`should dispatch SET_CURRENT and COUNT actions after finding current group`, () => {
      const foundGroup = <Group>{};
      spyOn(groupService, 'findOne').and.returnValue(Observable.of(foundGroup));
      runner.queue(new group.FindAndSetCurrentAction({}));
      groupEffects.findAndSetCurrent$
        .take(2)
        .scan((results: Action[], result: Action) => [...results, result], [])
        .skip(1)
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
});