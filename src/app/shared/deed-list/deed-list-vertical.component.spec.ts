import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterLinkStubDirective } from '../../../testing';
import { Deed } from '../../core/models';
import { StateService } from '../../core/services';
import { DeedListVerticalComponent } from './deed-list-vertical.component';

// TODO: create better tests that actually test the deed output

describe(`DeedListVerticalComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedListVerticalComponent,
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
    element = fixture.debugElement.query(By.directive(DeedListVerticalComponent));
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(element).toBeTruthy();
  });
});

@Component({
  template: `
    <liow-deed-list-vertical
      [deeds]="deeds"
      [alwaysGlobalCounters]="alwaysGlobalCounters"
    ></liow-deed-list-vertical>
  `,
})
class TestHostComponent {
  deeds: Deed[] = [];
  alwaysGlobalCounters = false;
}
