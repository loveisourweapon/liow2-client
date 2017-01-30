import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ModalHeaderComponent } from './modal-header.component';

describe(`ModalHeaderComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ModalHeaderComponent,
          TestHostComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(ModalHeaderComponent));
    fixture.detectChanges();
  });

  it(`should render the passed in modalTitle property`, () => {
    const headerElement = element.query(By.css('.modal-title'));
    expect(headerElement.nativeElement.textContent).toBe(testHost.modalTitle);
  });

  it(`should emit a 'close' event when clicking the close button`, () => {
    const closeSpy = spyOn(testHost, 'onClose');
    const closeElement = element.query(By.css('button.close'));
    closeElement.triggerEventHandler('click', new MouseEvent('click'));
    expect(closeSpy).toHaveBeenCalled();
  });
});

@Component({
  template: `<liow-modal-header [modalTitle]="modalTitle" (close)="onClose()"></liow-modal-header>`,
})
class TestHostComponent {
  modalTitle = 'Test Modal';
  onClose() { }
}
