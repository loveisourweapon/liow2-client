import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MediumEditorStubComponent } from '../../../testing';
import { CommentFormComponent } from './comment-form.component';

describe(`CommentFormComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          CommentFormComponent,
          TestHostComponent,
          MediumEditorStubComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(CommentFormComponent));
    fixture.detectChanges();
  });

  it(`should pass content through to MediumEditorComponent`, () => {
    const mediumEditorComponentElement = element.query(By.directive(MediumEditorStubComponent));
    const mediumEditorComponent = mediumEditorComponentElement.injector.get(MediumEditorStubComponent);
    expect(mediumEditorComponent.content).toBe(testHost.content);
  });

  it(`should show/hide the loading spinner based on isSaving property`, () => {
    const spinnerElement = element.query(By.css(`button .fa-spin`));
    expect(spinnerElement.nativeElement.hidden).toBe(true);

    testHost.isSaving = true;
    fixture.detectChanges();
    expect(spinnerElement.nativeElement.hidden).toBe(false);
  });
});

@Component({
  template: `
    <liow-comment-form
      [content]="content"
      [isSaving]="isSaving"
      (change)="onChange($event)"
      (save)="onSave($event)"
    ></liow-comment-form>
  `,
})
class TestHostComponent {
  content = 'Test content';
  isSaving = false;

  onChange(newContent: string): void {
    this.content = newContent;
  }

  onSave() { }
}
