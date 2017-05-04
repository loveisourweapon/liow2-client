import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DeedListStubComponent, FeedStubComponent, JumbtronStubComponent, TitleStubService } from '../../../testing';
import { StateService, TitleService } from '../../core/services';
import { GlobalFeedComponent } from './global-feed.component';

describe(`GlobalFeedComponent`, () => {
  let fixture: ComponentFixture<GlobalFeedComponent>;
  let component: GlobalFeedComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GlobalFeedComponent,
          DeedListStubComponent,
          FeedStubComponent,
          JumbtronStubComponent,
        ],
        providers: [
          StateService,
          { provide: TitleService, useClass: TitleStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalFeedComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it(`should render a feed of all testimonies and deeds done`, () => {
    const feedElement = element.query(By.directive(FeedStubComponent));
    const feedComponent = feedElement.injector.get(FeedStubComponent);
    expect(feedComponent.criteria).toEqual({ 'target.group': 'null' });
  });
});
