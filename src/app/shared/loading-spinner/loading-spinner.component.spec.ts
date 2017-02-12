import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoadingSpinnerComponent } from './loading-spinner.component';

describe(`LoadingSpinnerComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          LoadingSpinnerComponent,
          TestHostComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('i'));
    fixture.detectChanges();
  });

  it(`should add class 'fa-[size]'`, () => {
    const classList = element.nativeElement.classList;
    expect(classList.contains(`fa-${testHost.size}`)).toBe(true);
  });

  it(`should append all classes specified in the 'classes' input property`, () => {
    const classList = element.nativeElement.classList;
    testHost.classes.forEach((className: string) => expect(classList.contains(className)).toBe(true));
  });
});

@Component({
  template: `
    <ui-loading-spinner
      [size]="size"
      [classes]="classes"
    ></ui-loading-spinner>
  `,
})
class TestHostComponent {
  size = '2x';
  classes = ['extra', 'classes'];
}
