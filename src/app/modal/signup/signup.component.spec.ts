import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SignupModalComponent } from './signup.component';
import { ModalHeaderComponent } from '../modal-header.component';
import { EmailValidatorDirective } from '../../shared';
import { Group } from '../../store/group';
import * as auth from '../../store/auth/auth.actions';
import { State as SignupModalState } from '../../store/signup-modal';
import { State as AppState } from '../../store/reducer';
import { AlertStubComponent, ModalStubDirective, StoreStubService, SwitchStubComponent } from '../../../testing';

describe(`SignupModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: SignupModalComponent;
  let element: DebugElement;
  let store: Store<AppState>;

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
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(SignupModalComponent));
    component = element.injector.get(SignupModalComponent);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it(`should dispatch LOGIN_WITH_FACEBOOK action when 'Sign up with Facebook' is clicked`, () => {
    const facebookSpy = spyOn(store, 'dispatch');
    const facebookButton = element.query(By.css('.btn-facebook'));
    facebookButton.triggerEventHandler('click', new MouseEvent('click'));
    const action = facebookSpy.calls.mostRecent().args[0];
    expect(action.type).toBe(auth.ActionTypes.LOGIN_WITH_FACEBOOK);
  });

  // TODO: add more tests
});

@Component({
  template: `
    <liow-signup-modal
      [state]="state"
      [group]="group"
    ></liow-signup-modal>
  `,
})
class TestHostComponent {
  group = <Group>{
    _id: 'abc123',
  };
  state = <SignupModalState>{
    isOpen: false,
    isSigningUp: false,
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    joinGroup: false,
  };
}
