import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreStubService } from '../../../testing';
import { FeedComponent } from './feed.component';

describe(`FeedComponent`, () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          FeedComponent,
          FeedItemStubComponent,
          InViewportStubDirective,
        ],
        providers: [
          { provide: Store, useClass: StoreStubService },
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
  @Input() authUser: any;
}

@Directive({
  selector: '[uiInViewport]',
})
class InViewportStubDirective {
  @Output() inViewport = new EventEmitter<void>();
}
