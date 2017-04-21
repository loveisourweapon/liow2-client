import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  ActivatedRouteStubService,
  ControlPanelPaginationStubComponent,
  ControlPanelSearchStubComponent,
  IconCheckedStubComponent,
  RouterStubService,
  TitleStubService,
  UserStubService,
} from '../../../testing';
import { StateService, TitleService, UserService } from '../../core/services';
import { MomentPipe } from '../../shared';
import { UsersComponent } from './users.component';

// TODO: add proper tests

describe(`UsersComponent`, () => {
  let fixture: ComponentFixture<UsersComponent>;
  let component: UsersComponent;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          UsersComponent,
          ControlPanelPaginationStubComponent,
          ControlPanelSearchStubComponent,
          IconCheckedStubComponent,
          MomentPipe,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: Router, useClass: RouterStubService },
          StateService,
          { provide: TitleService, useClass: TitleStubService },
          { provide: UserService, useClass: UserStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

    userService = TestBed.get(UserService);
    spyOn(userService, 'find').and.returnValue(Observable.of([]));
    spyOn(userService, 'count').and.returnValue(Observable.of(0));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
