import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FeedStubComponent, JumbtronStubComponent, TitleStubService } from '../../../testing';
import { TitleService } from '../../core/services';
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
          FeedStubComponent,
          JumbtronStubComponent,
        ],
        providers: [
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
