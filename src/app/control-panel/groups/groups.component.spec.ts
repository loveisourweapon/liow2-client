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
  MarkedStubComponent,
  ModalStubDirective,
  RouterLinkStubDirective,
  StoreStubService,
  TitleStubService,
} from '../../../testing';
import { GroupsComponent } from './groups.component';

describe(`GroupsComponent`, () => {
  let fixture: ComponentFixture<GroupsComponent>;
  let component: GroupsComponent;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupsComponent,
          ControlPanelSearchStubComponent,
          MarkedStubComponent,
          ModalStubDirective,
          RouterLinkStubDirective,
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
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(Observable.of({}));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
