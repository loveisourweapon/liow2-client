import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeedComponent } from './home-feed.component';
import { Group } from '../../store/group';
import { FeedStubComponent, RouterLinkStubDirective } from '../../../testing';

describe(`HomeFeedComponent`, () => {
  let fixture: ComponentFixture<HomeFeedComponent>;
  let component: HomeFeedComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          HomeFeedComponent,
          FeedStubComponent,
          RouterLinkStubDirective,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe(`#getGroupCount`, () => {
    const counters = {
      'abc123': 123,
      'def456': 456,
    };

    it(`should return the current counter for a known group ID`, () => {
      let groupId = 'abc123';
      let count = component.getGroupCount(counters, groupId);
      expect(count).toBe(counters[groupId]);

      groupId = 'def456';
      count = component.getGroupCount(counters, groupId);
      expect(count).toBe(counters[groupId]);
    });

    it(`should return null for an unknown group ID`, () => {
      const unknownGroupId = 'ghi789';
      const count = component.getGroupCount(counters, unknownGroupId);
      expect(count).toBeNull();
    });
  });

  describe(`#listGroupIds`, () => {
    it(`should return a comma-separated list of group ID's from a list of groups`, () => {
      const groups = [<Group>{ _id: 'abc123' }, <Group>{ _id: 'def456' }];
      const groupIds = component.listGroupIds(groups);
      expect(groupIds).toBe('abc123,def456');
    });

    it(`should return a single group ID from a list with a single group`, () => {
      const groups = [<Group>{ _id: 'abc123' }];
      const groupIds = component.listGroupIds(groups);
      expect(groupIds).toBe('abc123');
    });

    it(`should return null from an empty or falsy list`, () => {
      const groups = [];
      const groupIds = component.listGroupIds(groups);
      expect(groupIds).toBeNull();
    });
  });
});
