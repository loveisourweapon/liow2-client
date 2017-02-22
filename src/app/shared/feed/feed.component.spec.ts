import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { FeedComponent } from './feed.component';
import { StoreStubService } from '../../../testing';

describe(`FeedComponent`, () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          FeedComponent,
          FeedItemStubComponent,
          InfiniteScrollStubDirective,
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
  // tslint:disable-next-line:directive-selector
  selector: '[infinite-scroll]',
})
class InfiniteScrollStubDirective {
  @Input() infiniteScrollDistance: number;
  @Input() infiniteScrollThrottle: number;
  @Output() scrolled = new EventEmitter();
}
