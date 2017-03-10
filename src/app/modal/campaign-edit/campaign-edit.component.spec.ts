import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DragulaModule } from 'ng2-dragula';

import { CampaignEditModalComponent } from './campaign-edit.component';
import { ModalHeaderComponent } from '../modal-header.component';
import { State as CampaignEditModalState, CampaignEditAction } from '../../store/campaign-edit-modal';
import { State as AppState } from '../../store/reducer';
import { AlertStubComponent, ModalStubDirective, StoreStubService } from '../../../testing';

describe(`CampaignEditModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: CampaignEditModalComponent;
  let element: DebugElement;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          CampaignEditModalComponent,
          TestHostComponent,
          AlertStubComponent,
          ModalHeaderComponent,
          ModalStubDirective,
        ],
        imports: [
          DragulaModule,
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
    element = fixture.debugElement.query(By.directive(CampaignEditModalComponent));
    component = element.injector.get(CampaignEditModalComponent);
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
    <liow-campaign-edit-modal
      [state]="state"
    ></liow-campaign-edit-modal>
  `,
})
class TestHostComponent {
  state = <CampaignEditModalState>{
    action: CampaignEditAction.Create,
    isOpen: false,
    isSaving: false,
    campaign: {
      group: '',
      deeds: [],
    },
    deeds: [],
    errorMessage: '',
  };
}
