import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import { AlertifyStubService, AuthStubService, ModalStubDirective } from '../../../testing';
import { ModalState } from '../../core/models';
import { AlertifyService, AuthService, StateService } from '../../core/services';
import { ModalHeaderComponent } from '../modal-header.component';
import { ForgotPasswordModalComponent } from './forgot-password.component';

describe(`ForgotPasswordModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: ForgotPasswordModalComponent;
  let element: DebugElement;
  let auth: AuthService;
  let state: StateService;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ForgotPasswordModalComponent,
          TestHostComponent,
          ModalHeaderComponent,
          ModalStubDirective,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: AuthService, useClass: AuthStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(ForgotPasswordModalComponent));
    component = element.injector.get(ForgotPasswordModalComponent);

    auth = TestBed.get(AuthService);
    state = TestBed.get(StateService);

    fixture.detectChanges();
  });

  it(`should call AuthService#sendForgotPassword when 'Email me a recovery link' is clicked`, () => {
    const sendSpy = spyOn(auth, 'sendForgotPassword').and.returnValue(Observable.of({}));

    const emailAddress = 'test@example.com';
    const emailInput = element.query(By.css('#email'));
    emailInput.triggerEventHandler('ngModelChange', emailAddress);
    fixture.detectChanges();

    const sendButton = element.query(By.css('.modal-footer > button.btn-primary'));
    sendButton.nativeElement.click();
    expect(sendSpy).toHaveBeenCalledWith(emailAddress);
  });

  it(`should set modal isOpen state to false when close button is clicked`, () => {
    state.modal.forgotPassword$.next({ isOpen: true });
    const closeButton = element.query(By.css('button.close'));
    closeButton.triggerEventHandler('click', null);
    state.modal.forgotPassword$.first()
      .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(false));
  });
});

@Component({
  template: `<liow-forgot-password-modal></liow-forgot-password-modal>`,
})
class TestHostComponent { }
