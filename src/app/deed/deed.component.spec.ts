import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DeedComponent } from './deed.component';
import { TitleService } from '../core';
import { State as AppState } from '../store/reducer';
import {
  ActivatedRouteStubService,
  DeedListStubComponent,
  FeedStubComponent,
  JumbtronStubComponent,
  MarkedStubComponent,
  StoreStubService,
  TitleStubService,
  YoutubePlayerStubComponent,
} from '../../testing';

// TODO: Add proper tests!
// Simple store spies won't work here because this component uses multiple `store.select` calls
// need more complicated spies or testing methods

xdescribe(`DeedComponent`, () => {
  let component: DeedComponent;
  let fixture: ComponentFixture<DeedComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedComponent,
          DeedListStubComponent,
          FeedStubComponent,
          JumbtronStubComponent,
          MarkedStubComponent,
          YoutubePlayerStubComponent,
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
