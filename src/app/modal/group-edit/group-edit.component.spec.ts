import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { GroupEditModalComponent } from './group-edit.component';
import { ModalHeaderComponent } from '../modal-header.component';
import * as auth from '../../store/auth/auth.actions';
import { State as GroupEditModalState, GroupEditAction } from '../../store/group-edit-modal';
import * as forgotPasswordModal from '../../store/forgot-password-modal/forgot-password-modal.actions';
import { State as AppState } from '../../store/reducer';
import { KebabCasePipe } from '../../shared';
import {
  AlertStubComponent,
  MediumEditorStubComponent,
  ModalStubDirective,
  StoreStubService,
  SwitchStubComponent,
  UserPickerStubComponent,
} from '../../../testing';

describe(`GroupEditModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: GroupEditModalComponent;
  let element: DebugElement;
  let store: Store<AppState>;

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
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(GroupEditModalComponent));
    component = element.injector.get(GroupEditModalComponent);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  // TODO: add proper tests
});

@Component({
  template: `
    <liow-group-edit-modal
      [state]="state"
      [isAuthenticated]="isAuthenticated"
    ></liow-group-edit-modal>
  `,
})
class TestHostComponent {
  isAuthenticated = true;
  state = <GroupEditModalState>{
    action: GroupEditAction.Create,
    isOpen: false,
    isSaving: false,
    group: {
      name: '',
      logo: null,
      coverImage: null,
      welcomeMessage: '',
    },
    setupCampaign: true,
    errorMessage: '',
    errors: {},
  };
}
