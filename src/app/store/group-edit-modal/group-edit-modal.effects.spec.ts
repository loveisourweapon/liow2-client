import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GroupEditModalEffects } from './index';
import * as groupEditModal from './group-edit-modal.actions';
import { Group } from '../group';
import { User, UserService } from '../user';
import { StoreStubService, UserStubService } from '../../../testing';

describe(`GroupEditModalEffects`, () => {
  let runner: EffectsRunner;
  let groupEditModalEffects: GroupEditModalEffects;
  let userService: UserService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          GroupEditModalEffects,
          { provide: Store, useClass: StoreStubService },
          { provide: UserService, useClass: UserStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, GroupEditModalEffects], (_runner, _groupEditModalEffects) => {
    runner = _runner;
    groupEditModalEffects = _groupEditModalEffects;
    userService = TestBed.get(UserService);
  }));

  describe(`findGroupUsers$`, () => {
    it(`should fetch users and dispatch UPDATE_GROUP_USERS if payload includes an initial group`, () => {
      const group = <Group>{ _id: 'abc123' };
      const payload = { action: 'Update', group };
      const response = <User[]>[];
      const userSpy = spyOn(userService, 'find').and.returnValue(Observable.of(response));
      runner.queue(new groupEditModal.OpenAction(payload));
      groupEditModalEffects.findGroupUsers$.subscribe((result: Action) => {
        expect(userSpy.calls.mostRecent().args[0].groups).toBe(group._id);
        expect(result.type).toBe(groupEditModal.ActionTypes.UPDATE_GROUP_USERS);
        expect(result.payload).toBe(response);
      });
    });
  });
});
