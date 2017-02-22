import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserComponent } from './user.component';
import { TitleService } from '../core';
import {
  ActivatedRouteStubService,
  FeedStubComponent,
  JumbtronStubComponent,
  StoreStubService,
  TitleStubService,
} from '../../testing';

xdescribe(`UserComponent`, () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          UserComponent,
          FeedStubComponent,
          JumbtronStubComponent,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: Store, useClass: StoreStubService },
          { provide: TitleService, useClass: TitleStubService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
