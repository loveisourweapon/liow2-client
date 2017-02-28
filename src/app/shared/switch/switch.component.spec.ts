import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SwitchComponent } from './switch.component';

describe(`SwitchComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          SwitchComponent,
          TestHostComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(SwitchComponent));
    fixture.detectChanges();
  });

  it(`should render the provided 'checked' state`, () => {
    const switchElement = element.query(By.css('.switch'));
    const classList = switchElement.nativeElement.classList;
    expect(classList.contains('checked')).toBe(true);

    testHost.checked = false;
    fixture.detectChanges();
    expect(classList.contains('checked')).toBe(false);
  });

  it(`should emit changes to the 'checked' state`, () => {
    const changeSpy = spyOn(testHost, 'onChange').and.callThrough();
    element.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(changeSpy).toHaveBeenCalledWith(false);
    element.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(changeSpy).toHaveBeenCalledWith(true);
  });

  it(`should render the label inside a .switch-label element`, () => {
    const labelElement = element.query(By.css('.switch-label'));
    expect(labelElement.nativeElement.innerText).toBe(testHost.label);
  });
});

@Component({
  template: `
    <ui-switch
      [checked]="checked"
      (change)="onChange($event)"
    >
      {{ label }}
    </ui-switch>
  `,
})
class TestHostComponent {
  label = 'Test Switch Label';
  checked = true;
  onChange(newValue: boolean) { this.checked = newValue; }
}
