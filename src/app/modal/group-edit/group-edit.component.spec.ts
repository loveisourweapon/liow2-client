import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { KebabCasePipe } from '../../shared';
import { State as AppState } from '../../store/reducer';
import { State as GroupEditModalState, GroupEditAction } from '../../store/modal/group-edit';
import {
  AlertStubComponent,
  MediumEditorStubComponent,
  ModalStubDirective,
  StoreStubService,
  SwitchStubComponent,
  UserPickerStubComponent,
} from '../../../testing';
import { ModalHeaderComponent } from '../modal-header.component';
import { GroupEditModalComponent } from './group-edit.component';

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
