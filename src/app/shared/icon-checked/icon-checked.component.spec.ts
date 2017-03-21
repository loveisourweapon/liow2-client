import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IconCheckedComponent } from './icon-checked.component';

describe(`IconCheckedComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          IconCheckedComponent,
          TestHostComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('i.fa'));
  });

  it(`should display a green tick if isChecked is true`, () => {
    testHost.isChecked = true;
    fixture.detectChanges();

    expect(element.nativeElement.classList.contains('fa-check-circle')).toBe(true);
    expect(element.nativeElement.classList.contains('text-success')).toBe(true);
    expect(element.nativeElement.classList.contains('fa-times-circle')).toBe(false);
    expect(element.nativeElement.classList.contains('text-muted')).toBe(false);
  });

  it(`should display a grey cross if isChecked is false`, () => {
    testHost.isChecked = false;
    fixture.detectChanges();

    expect(element.nativeElement.classList.contains('fa-times-circle')).toBe(true);
    expect(element.nativeElement.classList.contains('text-muted')).toBe(true);
    expect(element.nativeElement.classList.contains('fa-check-circle')).toBe(false);
    expect(element.nativeElement.classList.contains('text-success')).toBe(false);
  });
});

@Component({
  template: `<ui-icon-checked [isChecked]="isChecked"></ui-icon-checked>`,
})
class TestHostComponent {
  isChecked: boolean;
}
