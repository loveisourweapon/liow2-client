import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { NavbarComponent } from './navbar.component';
import { State as LayoutState } from '../../store/layout';
import * as layout from '../../store/layout/layout.actions';
import {
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
  RouterLinkStubDirective,
  StoreStubService,
} from '../../../testing';

describe(`NavbarComponent`, () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let element: DebugElement;
  let store: Store<LayoutState>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          NavbarComponent,
          DropdownStubDirective,
          DropdownMenuStubDirective,
          DropdownToggleStubDirective,
          RouterLinkStubDirective,
        ],
        providers: [
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    store = TestBed.get(Store);

    fixture.detectChanges();
  });

  // TODO: add more tests around what's being displayed and clicking more buttons

  it(`should dispatch SET_IS_MENU_OPEN action with true payload when clicking the navbar toggle button`, () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const toggleButton = element.query(By.css('button.navbar-toggle'));
    toggleButton.triggerEventHandler('click', null);
    const action = dispatchSpy.calls.mostRecent().args[0];
    expect(action.type).toBe(layout.ActionTypes.SET_IS_MENU_OPEN);
    expect(action.payload).toBe(true);
  });
});
