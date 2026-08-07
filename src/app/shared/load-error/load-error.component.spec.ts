import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoadErrorComponent } from './load-error.component';

describe(`LoadErrorComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          LoadErrorComponent,
          TestHostComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it(`should render the message specified in the 'message' input property`, () => {
    const text = fixture.debugElement.query(By.css('p')).nativeElement.textContent;
    expect(text).toContain(testHost.message);
  });

  it(`should emit from the 'retry' output property when the button is clicked`, () => {
    element.triggerEventHandler('click', null);
    expect(testHost.retryCount).toBe(1);
  });
});

@Component({
  template: `
    <ui-load-error
      [message]="message"
      (retry)="retryCount = retryCount + 1"
    ></ui-load-error>
  `,
})
class TestHostComponent {
  message = 'Something went wrong loading this thing.';
  retryCount = 0;
}
