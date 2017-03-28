import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { SameAsValidatorDirective } from '../../shared';
import { State as AppState } from '../../store/reducer';
import { State as ChangePasswordModalState } from '../../store/modal/change-password';
import { ModalStubDirective, StoreStubService } from '../../../testing';
import { ModalHeaderComponent } from '../modal-header.component';
import { ChangePasswordModalComponent } from './change-password.component';

describe(`ChangePasswordModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: ChangePasswordModalComponent;
  let element: DebugElement;
  let store: Store<AppState>;

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
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(ChangePasswordModalComponent));
    component = element.injector.get(ChangePasswordModalComponent);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <liow-change-password-modal 
      [state]="state"
    ></liow-change-password-modal>
  `,
})
class TestHostComponent {
  state = <ChangePasswordModalState>{
    isOpen: false,
    isSaving: false,
    user: null,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    errorMessage: '',
  };
}
