import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { GroupComponent } from './group.component';
import { GroupService } from '../store/services';
import {
  ActivatedRouteStubService,
  GroupStubService,
  JumbtronStubComponent,
  MarkedStubComponent,
  StoreStubService,
  TabsetStubComponent,
  TabStubComponent,
} from '../../testing';

// TODO: Add proper tests!
// Simple store spies won't work here because this component uses multiple `store.select` calls
// need more complicated spies or testing methods

describe(`GroupComponent`, () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupComponent,
          JumbtronStubComponent,
          MarkedStubComponent,
          TabsetStubComponent,
          TabStubComponent,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: GroupService, useClass: GroupStubService },
          { provide: Store, useClass: StoreStubService },
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
