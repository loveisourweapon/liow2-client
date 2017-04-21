import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import {
  ActStubService,
  AlertifyStubService,
  AuthStubService,
  IconCheckedStubComponent,
  ModalStubService,
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
import { UserComponent } from './user.component';

// TODO: add proper tests

describe(`UserComponent`, () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          UserComponent,
          MomentPipe,
          IconCheckedStubComponent,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: AlertifyService, useClass: AlertifyStubService },
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
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    const state = TestBed.get(StateService);
    state.controlPanel.user$.next({});

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
