import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ActStubService,
  AuthStubService,
  MarkedStubComponent,
  ModalStubService,
  TitleStubService,
  UserStubService,
} from '../../../testing';
import { ActService, AuthService, ModalService, StateService, TitleService, UserService } from '../../core/services';
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
          MomentPipe,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: ModalService, useClass: ModalStubService },
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
