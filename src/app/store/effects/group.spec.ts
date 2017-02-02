import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GroupEffects } from './group';
import * as group from '../actions/group';
import { GroupService } from '../services';
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
});
