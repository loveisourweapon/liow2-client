import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AuthStubService, MarkedStubComponent, RouterLinkStubDirective } from '../../../testing';
import { FeedItem, User } from '../../core/models';
import { AuthService, StateService } from '../../core/services';
import { FromNowPipe, MomentPipe } from '../../shared';
import { FeedItemComponent } from './feed-item.component';

describe(`FeedItemComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

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
        providers: [
          { provide: AuthService, useClass: AuthStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(FeedItemComponent));

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
    ></liow-feed-item>
  `,
})
class TestHostComponent {
  feedItem = <FeedItem>{
    _id: 'def456',
      user: <User>{ _id: 'abc123' },
      target: {},
  };
}
