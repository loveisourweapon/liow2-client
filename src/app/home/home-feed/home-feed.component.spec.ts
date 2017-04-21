import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedStubComponent, RouterLinkStubDirective } from '../../../testing';
import { Group } from '../../core/models';
import { StateService } from '../../core/services';
import { HomeFeedComponent } from './home-feed.component';

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
        providers: [
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
