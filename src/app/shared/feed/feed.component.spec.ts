import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
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
