import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LayoutEffects } from './index';
import * as layout from './layout.actions';
import { Deed, DeedService } from '../deed';
import { Group, GroupService } from '../group';
import { DeedStubService, GroupStubService } from '../../../testing';

xdescribe(`LayoutEffects`, () => {
  let runner: EffectsRunner;
  let layoutEffects: LayoutEffects;
  let deedService: DeedService;
  let groupService: GroupService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          LayoutEffects,
          { provide: DeedService, useClass: DeedStubService },
          { provide: GroupService, useClass: GroupStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, LayoutEffects], (_runner, _layoutEffects) => {
    runner = _runner;
    layoutEffects = _layoutEffects;
    deedService = TestBed.get(DeedService);
    groupService = TestBed.get(GroupService);
  }));

  describe(`loadSearchResults$`, () => {
    it(`should dispatch UPDATE_SEARCH_RESULTS action after finding results`, () => {
      const searchInput = 'test';
      const deedResult = <Deed>{ _id: 'abc123', title: 'Test Deed', urlTitle: 'test-deed' };
      const groupResult = <Group>{ _id: 'def456', name: 'Test Group', urlName: 'test-group' };
      const deedSpy = spyOn(deedService, 'find').and.returnValue(Observable.of([deedResult]));
      const groupSpy = spyOn(groupService, 'find').and.returnValue(Observable.of([groupResult]));
      runner.queue(new layout.UpdateSearchInputAction(searchInput));
      layoutEffects.loadSearchResults$.subscribe((result: Action) => {
        expect(deedSpy.calls.mostRecent().args[0].query).toBe(searchInput);
        expect(groupSpy.calls.mostRecent().args[0].query).toBe(searchInput);
        expect(result.type).toBe(layout.ActionTypes.UPDATE_SEARCH_RESULTS);
        expect(result.payload[0]).toEqual({ id: deedResult.urlTitle, name: deedResult.title, type: 'Deed' });
        expect(result.payload[1]).toEqual({ id: groupResult.urlName, name: groupResult.name, type: 'Deed' });
      });
    });
  });
});
