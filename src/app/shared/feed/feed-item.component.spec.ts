import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FeedItemComponent } from './feed-item.component';
import { FeedItem, User } from '../../store/models';
import { FromNowPipe, MomentPipe } from '../../shared';
import { MarkedStubComponent, RouterLinkStubDirective } from '../../../testing';

describe(`FeedItemComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
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

    testHost.authUser = authUser;
    testHost.feedItem = feedItem;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(element).toBeTruthy();
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
