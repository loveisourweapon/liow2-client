import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State as AppState } from '../../store/reducer';
import { State as DeedPreviewModalState } from '../../store/modal/deed-preview';
import {
  JumbtronStubComponent,
  MarkedStubComponent,
  ModalStubDirective,
  StoreStubService,
  YoutubePlayerStubComponent,
} from '../../../testing';
import { ModalHeaderComponent } from '../modal-header.component';
import { DeedPreviewModalComponent } from './deed-preview.component';

describe(`DeedPreviewModalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: DeedPreviewModalComponent;
  let element: DebugElement;
  let store: Store<AppState>;

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
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(DeedPreviewModalComponent));
    component = element.injector.get(DeedPreviewModalComponent);

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(Observable.of({}));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  // TODO: add proper tests
});

@Component({
  template: `
    <liow-deed-preview-modal
      [state]="state"
    ></liow-deed-preview-modal>
  `,
})
class TestHostComponent {
  state = <DeedPreviewModalState>{
    isOpen: false,
    deed: null,
  };
}
