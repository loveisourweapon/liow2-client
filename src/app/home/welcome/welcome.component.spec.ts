import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedListStubComponent, GroupStubService, ModalStubDirective, UserStubService } from '../../../testing';
import { GroupService, ModalService, StateService, UserService } from '../../core/services';
import { WelcomeComponent } from './welcome.component';

// TODO: add proper tests

describe(`WelcomeComponent`, () => {
  let fixture: ComponentFixture<WelcomeComponent>;
  let component: WelcomeComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          WelcomeComponent,
          DeedListStubComponent,
        ],
        providers: [
          { provide: GroupService, useClass: GroupStubService },
          { provide: ModalService, useClass: ModalStubDirective },
          StateService,
          { provide: UserService, useClass: UserStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
