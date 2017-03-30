import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GroupsControlPanelEffects } from './index';
import * as groupsControlPanel from './groups.actions';
import * as fromGroupsControlPanel from './groups.reducer';
import { State as AppState } from '../../reducer';
import { Group, GroupService } from '../../group';
import { GroupStubService, StoreStubService } from '../../../../testing';

describe(`GroupsControlPanelEffects`, () => {
  let runner: EffectsRunner;
  let groupsControlPanelEffects: GroupsControlPanelEffects;
  let groupService: GroupService;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          GroupsControlPanelEffects,
          { provide: GroupService, useClass: GroupStubService },
          { provide: Store, useClass: StoreStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, GroupsControlPanelEffects], (_runner, _groupsControlPanelEffects) => {
    runner = _runner;
    groupsControlPanelEffects = _groupsControlPanelEffects;
    groupService = TestBed.get(GroupService);
    store = TestBed.get(Store);
  }));

  describe(`loadGroups$`, () => {
    it(`should generate a SearchParams object`, () => {
      const findSpy = spyOn(groupService, 'find').and.returnValue(Observable.of([]));
      spyOn(groupService, 'count').and.returnValue(Observable.of(0));
      runner.queue(new groupsControlPanel.LoadGroupsAction(fromGroupsControlPanel.initialState));
      groupsControlPanelEffects.loadGroups$.subscribe(() => {
        const searchParams = findSpy.calls.mostRecent().args[0];
        expect(searchParams.query).toBe(fromGroupsControlPanel.initialState.query);
        expect(searchParams.limit).toBe(fromGroupsControlPanel.initialState.pageSize);
        expect(searchParams.skip).toBe(0);
        expect(searchParams.sort).toBe('-_id');
      });
    });

    it(`should dispatch LOAD_GROUPS_SUCCESS after finding and counting groups`, () => {
      const groups = [<Group>{}];
      const numberOfGroups = 1;
      spyOn(groupService, 'find').and.returnValue(Observable.of(groups));
      spyOn(groupService, 'count').and.returnValue(Observable.of(numberOfGroups));
      runner.queue(new groupsControlPanel.LoadGroupsAction(fromGroupsControlPanel.initialState));
      groupsControlPanelEffects.loadGroups$.subscribe((result: Action) => {
        expect(result.type).toBe(groupsControlPanel.ActionTypes.LOAD_GROUPS_SUCCESS);
        expect(result.payload.groups).toBe(groups);
        expect(result.payload.numberOfGroups).toBe(numberOfGroups);
      });
    });

    it(`should dispatch LOAD_GROUPS_FAIL after failing to find groups`, () => {
      const error = { message: 'Test error' };
      const response = new Response(new ResponseOptions({ body: error }));
      spyOn(groupService, 'find').and.returnValue(Observable.throw(response));
      runner.queue(new groupsControlPanel.LoadGroupsAction(fromGroupsControlPanel.initialState));
      groupsControlPanelEffects.loadGroups$.subscribe((result: Action) => {
        expect(result.type).toBe(groupsControlPanel.ActionTypes.LOAD_GROUPS_FAIL);
        expect(result.payload).toBe(error);
      });
    });
  });

  describe(`triggerLoadGroups$`, () => {
    beforeEach(() =>
      spyOn(store, 'select').and.returnValue(Observable.of(fromGroupsControlPanel.initialState)));

    it(`should dispatch LOAD_GROUPS with INITIALISE action`, () => {
      runner.queue(new groupsControlPanel.InitialiseAction());
      groupsControlPanelEffects.triggerLoadGroups$.subscribe((result: Action) => {
        expect(result.type).toBe(groupsControlPanel.ActionTypes.LOAD_GROUPS);
        expect(result.payload).toBe(fromGroupsControlPanel.initialState);
      });
    });

    it(`should dispatch LOAD_GROUPS with UPDATE_QUERY action`, () => {
      runner.queue(new groupsControlPanel.UpdateQueryAction('query'));
      groupsControlPanelEffects.triggerLoadGroups$.subscribe((result: Action) => {
        expect(result.type).toBe(groupsControlPanel.ActionTypes.LOAD_GROUPS);
        expect(result.payload).toBe(fromGroupsControlPanel.initialState);
      });
    });

    it(`should dispatch LOAD_GROUPS with UPDATE_PAGE action`, () => {
      runner.queue(new groupsControlPanel.UpdatePageAction(2));
      groupsControlPanelEffects.triggerLoadGroups$.subscribe((result: Action) => {
        expect(result.type).toBe(groupsControlPanel.ActionTypes.LOAD_GROUPS);
        expect(result.payload).toBe(fromGroupsControlPanel.initialState);
      });
    });
  });
});
