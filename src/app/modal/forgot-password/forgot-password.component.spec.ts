import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ForgotPasswordModalComponent } from './forgot-password.component';
import { ModalHeaderComponent } from '../modal-header.component';
import * as auth from '../../store/auth/auth.actions';
import { State as ForgotPasswordModalState } from '../../store/forgot-password-modal';
import * as forgotPasswordModal from '../../store/forgot-password-modal/forgot-password-modal.actions';
import { State as AppState } from '../../store/reducer';
import { ModalStubDirective, StoreStubService } from '../../../testing';

describe(`ForgotPasswordModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: ForgotPasswordModalComponent;
  let element: DebugElement;
  let store: Store<AppState>;

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
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(ForgotPasswordModalComponent));
    component = element.injector.get(ForgotPasswordModalComponent);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it(`should dispatch CLOSE action when close button is clicked`, () => {
    const closeSpy = spyOn(store, 'dispatch');
    const closeButton = element.query(By.css('button.close'));
    closeButton.triggerEventHandler('click', null);
    const action = closeSpy.calls.mostRecent().args[0];
    expect(action.type).toBe(forgotPasswordModal.ActionTypes.CLOSE);
  });

  it(`should dispatch UPDATE_EMAIL_ADDRESS action when typing into email input`, () => {
    const newValue = 'test@example.com';
    const emailSpy = spyOn(store, 'dispatch');
    const emailInput = element.query(By.css('#email'));

    emailInput.nativeElement.value = newValue;
    // TODO: should be able to use native input or change event?
    emailInput.triggerEventHandler('ngModelChange', newValue);
    fixture.detectChanges();

    const action = emailSpy.calls.mostRecent().args[0];
    expect(action.type).toBe(forgotPasswordModal.ActionTypes.UPDATE_EMAIL_ADDRESS);
    expect(action.payload).toBe(newValue);
  });

  it(`should dispatch SEND_FORGOT_PASSWORD action when 'Email me a recovery link' is clicked`, () => {
    testHost.state.emailAddress = 'test@example.com';
    fixture.detectChanges();

    const sendSpy = spyOn(store, 'dispatch');
    const sendButton = element.query(By.css('.modal-footer > button.btn-primary'));
    sendButton.nativeElement.click();
    const action = sendSpy.calls.mostRecent().args[0];
    expect(action.type).toBe(auth.ActionTypes.SEND_FORGOT_PASSWORD);
    expect(action.payload).toBe(testHost.state.emailAddress);
  });
});

@Component({
  template: `
    <liow-forgot-password-modal
      [state]="state"
    ></liow-forgot-password-modal>
  `,
})
class TestHostComponent {
  state = <ForgotPasswordModalState>{
    isOpen: false,
    isSending: false,
    emailAddress: '',
  };
}
