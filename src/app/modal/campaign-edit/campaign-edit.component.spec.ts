import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

import {
  AlertifyStubService,
  AlertStubComponent,
  CampaignStubService,
  DeedStubService,
  ModalStubDirective,
  ModalStubService,
} from '../../../testing';
import { Group } from '../../core/models';
import { AlertifyService, CampaignService, DeedService, ModalService, StateService } from '../../core/services';
import { ModalHeaderComponent } from '../modal-header.component';
import { CampaignEditModalComponent } from './campaign-edit.component';

// TODO: add proper tests

describe(`CampaignEditModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: CampaignEditModalComponent;
  let element: DebugElement;

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
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: CampaignService, useClass: CampaignStubService },
          { provide: DeedService, useClass: DeedStubService },
          { provide: ModalService, useClass: ModalStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(CampaignEditModalComponent));
    component = element.injector.get(CampaignEditModalComponent);
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <liow-campaign-edit-modal
      [group]="group"
    ></liow-campaign-edit-modal>
  `,
})
class TestHostComponent {
  group = <Group>{ _id: 'abc123' };
}
