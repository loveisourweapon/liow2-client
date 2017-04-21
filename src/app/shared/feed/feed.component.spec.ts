import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Component, EventEmitter, Input, Output } from '@angular/core';

import { FeedStubService } from '../../../testing';
import { FeedService, StateService } from '../../core/services';
import { FeedComponent } from './feed.component';

describe(`FeedComponent`, () => {
  let fixture: ComponentFixture<FeedComponent>;
  let component: FeedComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          FeedComponent,
          FeedItemStubComponent,
          InViewportStubDirective,
        ],
        providers: [
          { provide: FeedService, useClass: FeedStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'liow-feed-item',
  template: ``,
})
class FeedItemStubComponent {
  @Input() item: any;
}

@Directive({
  selector: '[uiInViewport]',
})
class InViewportStubDirective {
  @Output() inViewport = new EventEmitter<void>();
}
