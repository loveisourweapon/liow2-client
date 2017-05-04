import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterLinkStubDirective } from '../../../testing';
import { Deed } from '../../core/models';
import { StateService } from '../../core/services';
import { DeedListHorizontalComponent } from './deed-list-horizontal.component';

// TODO: create better tests that actually test the deed output

describe(`DeedListHorizontalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedListHorizontalComponent,
          TestHostComponent,
          RouterLinkStubDirective,
        ],
        providers: [
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(DeedListHorizontalComponent));
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(element).toBeTruthy();
  });
});

@Component({
  template: `
    <liow-deed-list-horizontal [deeds]="deeds"></liow-deed-list-horizontal>
  `,
})
class TestHostComponent {
  deeds: Deed[] = [];
}
