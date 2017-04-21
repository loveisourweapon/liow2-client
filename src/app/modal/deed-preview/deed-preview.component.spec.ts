import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  ActStubService,
  DeedStubService,
  JumbtronStubComponent,
  MarkedStubComponent,
  ModalStubDirective,
  YoutubePlayerStubComponent,
} from '../../../testing';
import { ActService, DeedService, StateService } from '../../core/services';
import { ModalHeaderComponent } from '../modal-header.component';
import { DeedPreviewModalComponent } from './deed-preview.component';

// TODO: add proper tests

describe(`DeedPreviewModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: DeedPreviewModalComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedPreviewModalComponent,
          TestHostComponent,
          JumbtronStubComponent,
          MarkedStubComponent,
          ModalHeaderComponent,
          ModalStubDirective,
          YoutubePlayerStubComponent,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: DeedService, useClass: DeedStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(DeedPreviewModalComponent));
    component = element.injector.get(DeedPreviewModalComponent);

    const deedService = TestBed.get(DeedService);
    spyOn(deedService, 'findOne').and.returnValue(Observable.of({}));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `<liow-deed-preview-modal></liow-deed-preview-modal>`,
})
class TestHostComponent { }
