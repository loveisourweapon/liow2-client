import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import {
  ActStubService,
  AlertifyStubService,
  AuthStubService,
  MarkedStubComponent,
  ModalStubDirective,
  ModalStubService,
  RouterStubService,
  TitleStubService,
  UserStubService,
} from '../../../testing';
import {
  ActService,
  AlertifyService,
  AuthService,
  ModalService,
  StateService,
  TitleService,
  UserService,
} from '../../core/services';
import { MomentPipe } from '../../shared';
import { GroupDetailComponent } from './group-detail.component';

// TODO: add proper tests

describe(`GroupDetailComponent`, () => {
  let fixture: ComponentFixture<GroupDetailComponent>;
  let component: GroupDetailComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupDetailComponent,
          MarkedStubComponent,
          ModalStubDirective,
          MomentPipe,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: ModalService, useClass: ModalStubService },
          { provide: Router, useClass: RouterStubService },
          StateService,
          { provide: TitleService, useClass: TitleStubService },
          { provide: UserService, useClass: UserStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
