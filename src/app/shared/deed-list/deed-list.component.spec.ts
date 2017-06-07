import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { DeedStubService } from '../../../testing';
import { Deed } from '../../core/models';
import { DeedService, StateService } from '../../core/services';
import { DeedListComponent } from './deed-list.component';

describe(`DeedListComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  const deeds: Deed[] = [<Deed>{ _id: 'abc123' }];

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
          { provide: DeedService, useClass: DeedStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement;

    const deedService = TestBed.get(DeedService);
    spyOn(deedService, 'find').and.returnValue(Observable.of(deeds));

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
  @Input() isGlobal: boolean;
}

@Component({
  selector: 'liow-deed-list-vertical',
  template: ``,
})
class DeedListVerticalStubComponent {
  @Input() deeds: any;
  @Input() isGlobal: boolean;
}
