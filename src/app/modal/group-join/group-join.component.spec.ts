import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import {
  AlertifyStubService,
  AlertStubComponent,
  AuthStubService,
  GroupStubService,
  ModalStubDirective,
  ModalStubService,
  RouterStubService,
  TypeaheadStubDirective,
  UserStubService,
} from '../../../testing';
import {
  AlertifyService,
  AuthService,
  GroupService,
  ModalService,
  StateService,
  UserService,
} from '../../core/services';
import { ModalHeaderComponent } from '../modal-header.component';
import { GroupJoinModalComponent } from './group-join.component';

// TODO: add proper tests

describe(`GroupJoinModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: GroupJoinModalComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupJoinModalComponent,
          TestHostComponent,
          AlertStubComponent,
          ModalHeaderComponent,
          ModalStubDirective,
          TypeaheadStubDirective,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: GroupService, useClass: GroupStubService },
          { provide: ModalService, useClass: ModalStubService },
          { provide: Router, useClass: RouterStubService },
          StateService,
          { provide: UserService, useClass: UserStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(GroupJoinModalComponent));
    component = element.injector.get(GroupJoinModalComponent);
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `<liow-group-join-modal></liow-group-join-modal>`,
})
class TestHostComponent { }
