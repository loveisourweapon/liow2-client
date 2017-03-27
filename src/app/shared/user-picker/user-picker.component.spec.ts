import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ModalStubDirective } from '../../../testing';
import { UserPickerComponent } from './user-picker.component';

describe(`UserPickerComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;
  let component: UserPickerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserPickerComponent,
        TestHostComponent,
        ModalStubDirective,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(UserPickerComponent));
    component = element.injector.get(UserPickerComponent);
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <liow-user-picker
      [userList]="userList"
      [selectedIds]="selectedIds"
      [lockedIds]="lockedIds"
      [disabled]="disabled"
      (change)="onSelectedUsersChange($event)"
    ></liow-user-picker>
  `,
})
class TestHostComponent {
  userList = [];
  selectedIds = [];
  lockedIds = [];
  disabled = false;

  onSelectedUsersChange(newSelectedIds: string[]) {
    this.selectedIds = newSelectedIds;
  }
}
