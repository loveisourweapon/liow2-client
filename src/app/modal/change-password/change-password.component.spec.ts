import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AlertifyStubService, ModalStubDirective, UserStubService } from '../../../testing';
import { AlertifyService, StateService, UserService } from '../../core/services';
import { SameAsValidatorDirective } from '../../shared';
import { ModalHeaderComponent } from '../modal-header.component';
import { ChangePasswordModalComponent } from './change-password.component';

// TODO: add proper tests

describe(`ChangePasswordModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: ChangePasswordModalComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ChangePasswordModalComponent,
          TestHostComponent,
          ModalHeaderComponent,
          ModalStubDirective,
          SameAsValidatorDirective,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: AlertifyService, useClass: AlertifyStubService },
          StateService,
          { provide: UserService, useClass: UserStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(ChangePasswordModalComponent));
    component = element.injector.get(ChangePasswordModalComponent);
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `<liow-change-password-modal></liow-change-password-modal>`,
})
class TestHostComponent { }
