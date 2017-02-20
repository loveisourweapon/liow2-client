import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MediumEditorComponent } from './medium-editor.component';

describe(`MediumEditorComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          FormsModule,
        ],
        declarations: [
          MediumEditorComponent,
          TestHostComponent,
        ],
      })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
    element = <HTMLElement>document.querySelector('.medium-editor > .medium-editor-element');
  }));

  it(`should show/hide the placeholder text when content is empty/not empty`, () => {
    const placeholderStyles = window.getComputedStyle(element, ':after');
    expect(placeholderStyles.getPropertyValue('content')).toBe(`"${testHost.placeholder}"`);

    testHost.content = 'Test content';
    fixture.detectChanges();
    expect(placeholderStyles.getPropertyValue('content')).toBe(``);
  });

  it(`should render Markdown content as HTML`, () => {
    const input = `Testing _emphasized_ and **strong**`;
    const output = `<p>Testing <em>emphasized</em> and <strong>strong</strong></p>`;
    testHost.content = input;
    fixture.detectChanges();
    expect(element.innerHTML).toBe(output);
  });
});

@Component({
  template: `
    <ui-medium-editor
      [content]="content"
      (change)="onChange($event)"
      [placeholder]="placeholder"
    ></ui-medium-editor>
  `,
})
class TestHostComponent {
  content = '';
  placeholder = 'Test placeholder';

  onChange(newContent: string): void {
    this.content = newContent;
  }
}
