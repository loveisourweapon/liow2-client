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
  SwitchStubComponent,
  UserStubService,
} from '../../../testing';
import { Group } from '../../core/models';
import { AlertifyService, AuthService, ModalService, StateService, UserService } from '../../core/services';
import { EmailValidatorDirective } from '../../shared';
import { ModalHeaderComponent } from '../modal-header.component';
import { SignupModalComponent } from './signup.component';

// TODO: add more tests

describe(`SignupModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: SignupModalComponent;
  let element: DebugElement;
  let auth: AuthService;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          SignupModalComponent,
          TestHostComponent,
          AlertStubComponent,
          ModalHeaderComponent,
          ModalStubDirective,
          SwitchStubComponent,
          EmailValidatorDirective,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: ModalService, useClass: ModalStubService },
          StateService,
          { provide: UserService, useClass: UserStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(SignupModalComponent));
    component = element.injector.get(SignupModalComponent);

    auth = TestBed.get(AuthService);

    fixture.detectChanges();
  });

  it(`should call AuthService#authenticateFacebook when 'Sign in with Facebook' is clicked`, () => {
    const facebookSpy = spyOn(auth, 'authenticateFacebook').and.returnValue(Observable.of({}));
    const facebookButton = element.query(By.css('.btn-facebook'));
    facebookButton.triggerEventHandler('click', null);
    expect(facebookSpy).toHaveBeenCalled();
  });
});

@Component({
  template: `<liow-signup-modal [group]="group"></liow-signup-modal>`,
})
class TestHostComponent {
  group = <Group>{
    _id: 'abc123',
  };
}
