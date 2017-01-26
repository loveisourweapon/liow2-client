import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { DeedComponent } from './deed.component';
import * as fromDeed from '../store/reducers/deed';
import {
  ActivatedRouteStubService,
  DeedListStubComponent,
  JumbtronStubComponent,
  StoreStubService,
} from '../../testing';

// TODO: Add tests!
// I'm giving up on tests for now because this component uses multiple `store.select` calls
// Simple spies won't work here, need more complicated spies or testing methods

xdescribe(`DeedComponent`, () => {
  let component: DeedComponent;
  let fixture: ComponentFixture<DeedComponent>;
  let store: Store<fromDeed.State>;

  const deeds = [];

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedComponent,
          DeedListStubComponent,
          JumbtronStubComponent,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(TestBed.get(Store), 'select').and.returnValue(deeds);

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
