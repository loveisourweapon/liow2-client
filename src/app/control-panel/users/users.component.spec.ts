import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TitleService } from '../../core';
import { MomentPipe } from '../../shared';
import { State as AppState } from '../../store/reducer';
import {
  ActivatedRouteStubService,
  ControlPanelSearchStubComponent,
  IconCheckedStubComponent,
  PaginationStubComponent,
  StoreStubService,
  TitleStubService,
} from '../../../testing';
import { UsersComponent } from './users.component';

describe(`UsersComponent`, () => {
  let fixture: ComponentFixture<UsersComponent>;
  let component: UsersComponent;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          UsersComponent,
          ControlPanelSearchStubComponent,
          IconCheckedStubComponent,
          PaginationStubComponent,
          MomentPipe,
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
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(Observable.of({}));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
