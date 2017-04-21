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
  MediumEditorStubComponent,
  ModalStubDirective,
  ModalStubService,
  RouterStubService,
  SwitchStubComponent,
  UserPickerStubComponent,
  UserStubService,
} from '../../../testing';
import { User } from '../../core/models';
import {
  AlertifyService,
  AuthService,
  GroupService,
  ModalService,
  StateService,
  UserService,
} from '../../core/services';
import { KebabCasePipe } from '../../shared';
import { ModalHeaderComponent } from '../modal-header.component';
import { GroupEditModalComponent } from './group-edit.component';

// TODO: add proper tests

describe(`GroupEditModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: GroupEditModalComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupEditModalComponent,
          TestHostComponent,
          KebabCasePipe,
          AlertStubComponent,
          MediumEditorStubComponent,
          ModalHeaderComponent,
          ModalStubDirective,
          SwitchStubComponent,
          UserPickerStubComponent,
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
    element = fixture.debugElement.query(By.directive(GroupEditModalComponent));
    component = element.injector.get(GroupEditModalComponent);
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

});

@Component({
  template: `
    <liow-group-edit-modal
      [isAuthenticated]="isAuthenticated"
      [authUser]="authUser"
    ></liow-group-edit-modal>
  `,
})
class TestHostComponent {
  isAuthenticated = true;
  authUser = <User>{ _id: 'abc123' };
}
