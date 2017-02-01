import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DeedComponent } from './deed.component';
import * as fromRoot from '../store/reducers';
import {
  ActivatedRouteStubService,
  DeedListStubComponent,
  JumbtronStubComponent,
  MarkedStubComponent,
  StoreStubService,
} from '../../testing';

// TODO: Add proper tests!
// Simple store spies won't work here because this component uses multiple `store.select` calls
// need more complicated spies or testing methods

xdescribe(`DeedComponent`, () => {
  let component: DeedComponent;
  let fixture: ComponentFixture<DeedComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedComponent,
          DeedListStubComponent,
          JumbtronStubComponent,
          MarkedStubComponent,
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
    spyOn(TestBed.get(Store), 'select').and.returnValue(Observable.of([]));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
