import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  AlertifyStubService,
  AlertStubComponent,
  AuthStubService,
  ModalStubDirective,
  ModalStubService,
  SwitchStubComponent
} from '../../../testing';
import { Group } from '../../core/models';
import { AlertifyService, AuthService, ModalService, StateService } from '../../core/services';
import { ModalHeaderComponent } from '../modal-header.component';
import { LoginModalComponent } from './login.component';

// TODO: add more tests

describe(`LoginModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: LoginModalComponent;
  let element: DebugElement;
  let auth: AuthService;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          LoginModalComponent,
          TestHostComponent,
          AlertStubComponent,
          ModalHeaderComponent,
          ModalStubDirective,
          SwitchStubComponent,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: ModalService, useClass: ModalStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(LoginModalComponent));
    component = element.injector.get(LoginModalComponent);

    auth = TestBed.get(AuthService);

    fixture.detectChanges();
  });

  // it(`should call AuthService#authenticateFacebook when 'Sign in with Facebook' is clicked`, () => {
  //   const facebookSpy = spyOn(auth, 'authenticateFacebook').and.returnValue(Observable.of({}));
  //   const facebookButton = element.query(By.css('.btn-facebook'));
  //   facebookButton.triggerEventHandler('click', null);
  //   expect(facebookSpy).toHaveBeenCalled();
  // });

  it(`should call AuthService#authenticateEmail when 'Login' is clicked`, () => {
    testHost.group = null;
    fixture.detectChanges();

    const loginSpy = spyOn(auth, 'authenticateEmail').and.returnValue(Observable.of({}));
    const loginButton = element.query(By.css('.modal-footer > button.btn-primary'));
    loginButton.nativeElement.click();
    expect(loginSpy).toHaveBeenCalledWith(component.credentials);
  });
});

@Component({
  template: `<liow-login-modal [group]="group"></liow-login-modal>`,
})
class TestHostComponent {
  group = <Group>{
    _id: 'abc123',
  };
}
