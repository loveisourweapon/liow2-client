import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { GroupComponent } from './group.component';
import { TitleService } from '../core';
import {
  ActivatedRouteStubService,
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
  FeedStubComponent,
  JumbtronStubComponent,
  MarkedStubComponent,
  StoreStubService,
  TabsetStubComponent,
  TabStubComponent,
  TitleStubService,
} from '../../testing';

// TODO: Add proper tests!
// Simple store spies won't work here because this component uses multiple `store.select` calls
// need more complicated spies or testing methods

xdescribe(`GroupComponent`, () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupComponent,
          DropdownStubDirective,
          DropdownMenuStubDirective,
          DropdownToggleStubDirective,
          FeedStubComponent,
          JumbtronStubComponent,
          MarkedStubComponent,
          TabsetStubComponent,
          TabStubComponent,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: Store, useClass: StoreStubService },
          { provide: TitleService, useClass: TitleStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
