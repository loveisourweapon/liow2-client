import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MarkedComponent } from './marked.component';

describe(`MarkedComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          MarkedComponent,
          TestHostComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(MarkedComponent)).query(By.css('div'));
  });

  it(`should render raw string content as markdown`, () => {
    const testCases = [
      { input: `Foo Bar`, expected: `<p>Foo Bar</p>` },
      { input: `# Foo Bar`, expected: `<h1 id="foo-bar">Foo Bar</h1>` },
      { input: `**Foo** _Bar_`, expected: `<p><strong>Foo</strong> <em>Bar</em></p>` },
    ];

    testCases.forEach(testCase => {
      testHost.rawContent = testCase.input;
      fixture.detectChanges();

      const output = element.nativeElement.innerHTML.trim();
      expect(output).toBe(testCase.expected);
    });
  });
});

@Component({
  template: `<ui-marked [content]="rawContent"></ui-marked>`,
})
class TestHostComponent {
  rawContent: string;
}
