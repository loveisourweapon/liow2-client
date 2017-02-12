import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FeedItemComponent } from './feed-item.component';
import { FeedItem } from '../../store/feed';
import { Group } from '../../store/group';
import { User } from '../../store/user';
import { FromNowPipe, MomentPipe } from '../../shared';
import { MarkedStubComponent, RouterLinkStubDirective } from '../../../testing';

describe(`FeedItemComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: FeedItemComponent;
  let element: DebugElement;

  const authUser = <User>{
    _id: 'abc123',
  };
  const feedItem = <FeedItem>{
    _id: 'def456',
    user: authUser,
    target: {},
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          FeedItemComponent,
          TestHostComponent,
          FromNowPipe,
          MomentPipe,
          MarkedStubComponent,
          RouterLinkStubDirective,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(FeedItemComponent));
    component = element.injector.get(FeedItemComponent);

    testHost.authUser = authUser;
    testHost.feedItem = feedItem;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`#isMemberOfGroup`, () => {
    const group1 = <Group>{ _id: 'abc123' };
    const group2 = <Group>{ _id: 'def456' };

    it(`should return false if authUser or group aren't set`, () => {
      expect(component.isMemberOfGroup(null, null)).toBe(false);
    });

    it(`should return false if authUser has no groups`, () => {
      const authUser = <User>{ groups: [] };
      expect(component.isMemberOfGroup(authUser, group1)).toBe(false);
    });

    it(`should return false if authUser groups doesn't include specified group`, () => {
      const authUser = <User>{ groups: [group1] };
      expect(component.isMemberOfGroup(authUser, group2)).toBe(false);
    });

    it(`should return true if authUser groups includes specified group`, () => {
      const authUser = <User>{ groups: [group1, group2] };
      expect(component.isMemberOfGroup(authUser, group2)).toBe(true);
    });
  });
});

@Component({
  template: `
    <liow-feed-item
      [item]="feedItem"
      [authUser]="authUser"
    ></liow-feed-item>
  `,
})
class TestHostComponent {
  authUser: User;
  feedItem: FeedItem;
}
