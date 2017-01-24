import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DeedListComponent } from './deed-list.component';
import { StoreStubService } from '../../../testing';

describe('DeedListComponent', () => {
  let component: DeedListComponent;
  let fixture: ComponentFixture<DeedListComponent>;
  let element: DebugElement;

  const deeds = [];

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedListComponent,
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
    fixture = TestBed.createComponent(DeedListComponent);
    component = fixture.componentInstance;
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
    component.layout = 'horizontal';
    fixture.detectChanges();

    const horizontalElement = element.query(By.directive(DeedListHorizontalStubComponent));
    const verticalElement = element.query(By.directive(DeedListVerticalStubComponent));

    expect(horizontalElement).toBeTruthy();
    expect(verticalElement).toBeNull();
  });

  it(`should show DeedListVerticalComponent from 'vertical' layout`, () => {
    component.layout = 'vertical';
    fixture.detectChanges();

    const horizontalElement = element.query(By.directive(DeedListHorizontalStubComponent));
    const verticalElement = element.query(By.directive(DeedListVerticalStubComponent));

    expect(horizontalElement).toBeNull();
    expect(verticalElement).toBeTruthy();
  });

  it(`should pass resolved deeds property through to sub-component`, () => {
    component.layout = 'horizontal';
    fixture.detectChanges();

    const horizontalElement = element.query(By.directive(DeedListHorizontalStubComponent));
    const horizontalComponent = horizontalElement.injector.get(DeedListHorizontalStubComponent);
    expect(horizontalComponent.deeds).toEqual(deeds);
  });
});

@Component({
  selector: 'liow-deed-list-horizontal',
  template: '',
})
class DeedListHorizontalStubComponent {
  @Input() deeds: any;
}

@Component({
  selector: 'liow-deed-list-vertical',
  template: '',
})
class DeedListVerticalStubComponent {
  @Input() deeds: any;
}

// Required for AOT compiler
@NgModule({
  declarations: [
    DeedListHorizontalStubComponent,
    DeedListVerticalStubComponent,
  ],
})
class TestingModule { }
