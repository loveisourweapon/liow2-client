import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ControlPanelSearchComponent } from './search.component';

describe(`ControlPanelSearchComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ControlPanelSearchComponent,
          TestHostComponent,
        ],
        imports: [
          FormsModule,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('input.form-control'));
  });

  it(`should show the current query value in the input box`, () => {
    const newQuery = 'test query';
    testHost.query = newQuery;
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => expect(element.nativeElement.value).toBe(newQuery));
  });

  it(`should emit changed query value after a delay`, (done) => {
    const newQuery = 'test query';
    const searchSpy = spyOn(testHost, 'onSearch');
    element.triggerEventHandler('ngModelChange', newQuery);
    fixture.detectChanges();
    expect(searchSpy.calls.mostRecent()).toBeUndefined();
    setTimeout(() => {
      expect(searchSpy.calls.mostRecent().args[0]).toBe(newQuery);
      done();
    }, 400); // deliberately slightly larger in case of possibly flaky test
  });
});

@Component({
  template: `
    <liow-control-panel-search
      [query]="query"
      (search)="onSearch($event)"
    ></liow-control-panel-search>
  `,
})
class TestHostComponent {
  query = '';
  onSearch(newQuery: string) { this.query = newQuery; }
}
