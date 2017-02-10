import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SignupModalComponent } from './signup.component';
import { ModalHeaderComponent } from '../modal-header.component';
import { Group } from '../../store/models';
import * as auth from '../../store/actions/auth';
import * as fromSignupModal from '../../store/reducers/modal/signup';
import { State as AppState } from '../../store/reducers';
import { ModalStubDirective, StoreStubService } from '../../../testing';

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
  state = <fromSignupModal.State>{
    isOpen: false,
    isSigningUp: false,
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    joinGroup: false,
    showJoinGroup: false,
  };
}
