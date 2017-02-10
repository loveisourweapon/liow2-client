import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LoginModalComponent } from './login.component';
import { ModalHeaderComponent } from '../modal-header.component';
import { Group } from '../../store/models';
import * as auth from '../../store/actions/auth';
import * as loginModal from '../../store/actions/modal/login';
import * as fromLoginModal from '../../store/reducers/modal/login';
import * as fromRoot from '../../store/reducers';
import { ModalStubDirective, StoreStubService } from '../../../testing';

describe(`LoginModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: LoginModalComponent;
  let element: DebugElement;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          LoginModalComponent,
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
    element = fixture.debugElement.query(By.directive(LoginModalComponent));
    component = element.injector.get(LoginModalComponent);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it(`should dispatch LOGIN_WITH_FACEBOOK action when 'Sign in with Facebook' is clicked`, () => {
    const facebookSpy = spyOn(store, 'dispatch');
    const facebookButton = element.query(By.css('.btn-facebook'));
    facebookButton.triggerEventHandler('click', new MouseEvent('click'));
    const action = facebookSpy.calls.mostRecent().args[0];
    expect(action.type).toBe(auth.ActionTypes.LOGIN_WITH_FACEBOOK);
  });

  it(`should dispatch UPDATE_EMAIL when typing into email input`, () => {
    const newValue = 'test@example.com';
    const emailSpy = spyOn(store, 'dispatch');
    const emailInput = element.query(By.css('[name=email]'));

    emailInput.nativeElement.value = newValue;
    // TODO: should be able to use native input or change event?
    emailInput.triggerEventHandler('ngModelChange', newValue);
    fixture.detectChanges();

    const action = emailSpy.calls.mostRecent().args[0];
    expect(action.type).toBe(loginModal.ActionTypes.UPDATE_EMAIL);
    expect(action.payload).toBe(newValue);
  });

  it(`should dispatch UPDATE_PASSWORD when typing into password input`, () => {
    const newValue = 'testing123';
    const passwordSpy = spyOn(store, 'dispatch');
    const passwordInput = element.query(By.css('[name=password]'));

    passwordInput.nativeElement.value = newValue;
    // TODO: should be able to use native input or change event?
    passwordInput.triggerEventHandler('ngModelChange', newValue);
    fixture.detectChanges();

    const action = passwordSpy.calls.mostRecent().args[0];
    expect(action.type).toBe(loginModal.ActionTypes.UPDATE_PASSWORD);
    expect(action.payload).toBe(newValue);
  });

  it(`should dispatch LOGIN_WITH_EMAIL action when 'Login' is clicked`, () => {
    const loginSpy = spyOn(store, 'dispatch');
    const loginButton = element.query(By.css('.modal-footer > button.btn-primary'));
    loginButton.triggerEventHandler('click', new MouseEvent('click'));
    const action = loginSpy.calls.mostRecent().args[0];
    expect(action.type).toBe(auth.ActionTypes.LOGIN_WITH_EMAIL);
    expect(action.payload).toBe(testHost.state.credentials);
  });

  it(`should close and open Forgot Password modal when 'Forgot your password?' is clicked`, () => {
    const closeSpy = spyOn(component, 'onClose');
    const openForgotSpy = spyOn(component, 'openForgotPassword');
    const forgotButton = element.query(By.css('.help-block > button.btn-link'));
    forgotButton.triggerEventHandler('click', new MouseEvent('click'));
    expect(closeSpy).toHaveBeenCalled();
    expect(openForgotSpy).toHaveBeenCalled();
  });

  it(`should close and open Signup modal when 'Sign up now' is clicked`, () => {
    const closeSpy = spyOn(component, 'onClose');
    const openSignupSpy = spyOn(component, 'openSignup');
    const signupButton = element.query(By.css('.modal-body > :last-child > button.btn-link'));
    signupButton.triggerEventHandler('click', new MouseEvent('click'));
    expect(closeSpy).toHaveBeenCalled();
    expect(openSignupSpy).toHaveBeenCalled();
  });
});

@Component({
  template: `
    <liow-login-modal
      [state]="state"
      [group]="group"
    ></liow-login-modal>
  `,
})
class TestHostComponent {
  group = <Group>{
    _id: 'abc123',
  };
  state = <fromLoginModal.State>{
    isOpen: false,
    isLoggingIn: false,
    credentials: {
      email: '',
      password: '',
    },
    joinGroup: false,
    showJoinGroup: false,
  };
}
