import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { StoreStubService } from '../../../testing';
import { DeedListComponent } from './deed-list.component';

describe(`DeedListComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  const deeds = [];

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedListComponent,
          TestHostComponent,
          DeedListHorizontalStubComponent,
          DeedListVerticalStubComponent,
        ],
        providers: [
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement;

    spyOn(TestBed.get(Store), 'select').and.returnValue(Observable.of(deeds));

    fixture.detectChanges();
  });

  it(`should show nothing for blank or unknown layout`, () => {
    const horizontalElement = element.query(By.directive(DeedListHorizontalStubComponent));
    const verticalElement = element.query(By.directive(DeedListVerticalStubComponent));

    expect(horizontalElement).toBeNull();
    expect(verticalElement).toBeNull();
  });

  it(`should show DeedListHorizontalComponent from 'horizontal' layout`, () => {
    testHost.layout = 'horizontal';
    fixture.detectChanges();

    const horizontalElement = element.query(By.directive(DeedListHorizontalStubComponent));
    const verticalElement = element.query(By.directive(DeedListVerticalStubComponent));

    expect(horizontalElement).toBeTruthy();
    expect(verticalElement).toBeNull();
  });

  it(`should show DeedListVerticalComponent from 'vertical' layout`, () => {
    testHost.layout = 'vertical';
    fixture.detectChanges();

    const horizontalElement = element.query(By.directive(DeedListHorizontalStubComponent));
    const verticalElement = element.query(By.directive(DeedListVerticalStubComponent));

    expect(horizontalElement).toBeNull();
    expect(verticalElement).toBeTruthy();
  });

  it(`should pass resolved deeds property through to sub-component`, () => {
    testHost.layout = 'horizontal';
    fixture.detectChanges();

    const horizontalElement = element.query(By.directive(DeedListHorizontalStubComponent));
    const horizontalComponent = horizontalElement.injector.get(DeedListHorizontalStubComponent);
    expect(horizontalComponent.deeds).toEqual(deeds);
  });
});

@Component({
  template: `<liow-deed-list [layout]="layout"></liow-deed-list>`,
})
class TestHostComponent {
  layout: string;
}

@Component({
  selector: 'liow-deed-list-horizontal',
  template: ``,
})
class DeedListHorizontalStubComponent {
  @Input() deeds: any;
  @Input() counters: any;
}

@Component({
  selector: 'liow-deed-list-vertical',
  template: ``,
})
class DeedListVerticalStubComponent {
  @Input() deeds: any;
  @Input() currentDeed: any;
  @Input() counters: any;
}
