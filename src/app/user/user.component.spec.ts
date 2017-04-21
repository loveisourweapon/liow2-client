import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  ActStubService,
  ActivatedRouteStubService,
  FeedStubComponent,
  JumbtronStubComponent,
  ModalStubService,
  TitleStubService,
  UserStubService,
} from '../../testing';
import { User } from '../core/models';
import { ActService, ModalService, StateService, TitleService, UserService } from '../core/services';
import { UserComponent } from './user.component';

// TODO: add proper tests

describe(`UserComponent`, () => {
  let fixture: ComponentFixture<UserComponent>;
  let component: UserComponent;
  let route: ActivatedRouteStubService;
  let userService: UserService;

  const testUser = <User>{ _id: 'abc123' };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          UserComponent,
          FeedStubComponent,
          JumbtronStubComponent,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: ModalService, useClass: ModalStubService },
          StateService,
          { provide: TitleService, useClass: TitleStubService },
          { provide: UserService, useClass: UserStubService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    route = TestBed.get(ActivatedRoute);
    route.params.next({ userId: testUser._id });
    userService = TestBed.get(UserService);
    spyOn(userService, 'get').and.returnValue(Observable.of(testUser));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
