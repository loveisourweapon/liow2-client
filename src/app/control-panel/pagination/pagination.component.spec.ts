import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PaginationStubComponent } from '../../../testing';
import { ControlPanelPaginationComponent } from './pagination.component';

describe(`ControlPanelPaginationComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ControlPanelPaginationComponent,
          TestHostComponent,
          PaginationStubComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(ControlPanelPaginationComponent));
  });

  it(`should create`, () => {
    expect(element).toBeTruthy();
  });
});

@Component({
  template: `
    <liow-control-panel-pagination
      typeOfItems="items"
      [numberOfItems]="numberOfItems"
      [numberOfPages]="numberOfPages"
      [currentPage]="currentPage"
      [pageSize]="pageSize"
      (numberOfPagesChanged)="onNumberOfPagesChanged($event)"
      (currentPageChanged)="onCurrentPageChanged($event)"
    ></liow-control-panel-pagination>
  `,
})
class TestHostComponent {
  numberOfItems = 1;
  numberOfPages = 1;
  currentPage = 1;
  pageSize = 20;
  onNumberOfPagesChanged(numberOfPages: number) { this.numberOfPages = numberOfPages; }
  onCurrentPageChanged(currentPage: number) { this.currentPage = currentPage; }
}
