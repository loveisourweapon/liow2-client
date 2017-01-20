import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { NavbarComponent } from './navbar.component';
import { LayoutState } from '../reducers';
import { LayoutActionTypes } from '../actions';
import {
  CollapseStubDirective,
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
  RouterLinkStubDirective,
  StoreStubService,
} from '../../../testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let element: DebugElement;
  let store: Store<LayoutState>;
  let state: BehaviorSubject<LayoutState>;

  const initialState: LayoutState = {
    isMenuOpen: false,
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          NavbarComponent,
          CollapseStubDirective,
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
    store = TestBed.get(Store);
    state = new BehaviorSubject(initialState);
    spyOn(TestBed.get(Store), 'select').and.returnValue(state);

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it(`should get the isMenuOpen state from store`, () => {
    component.isMenuOpen$.subscribe((isMenuOpen: boolean) => {
      expect(isMenuOpen).toBe(initialState.isMenuOpen);
    });
  });

  it(`should trigger TOGGLE_MENU when clicking the navbar toggle button`, () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const toggleButton = element.query(By.css('button.navbar-toggle'));
    toggleButton.triggerEventHandler('click', new MouseEvent('click'));
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe(LayoutActionTypes.TOGGLE_MENU);
  });

  it(`should trigger CLOSE_MENU when clicking a router link`, () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const routerLink = element.query(By.css('ul.navbar-right > li:first-child > a'));
    routerLink.triggerEventHandler('click', new MouseEvent('click'));
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe(LayoutActionTypes.CLOSE_MENU);
  });

  it(`should pass isCollapsed state to [collapse] directive`, () => {
    const collapseElement = element.query(By.directive(CollapseStubDirective));
    const collapseDirective = collapseElement.injector.get(CollapseStubDirective);
    expect(collapseDirective.isCollapsed).toBe(!initialState.isMenuOpen);

    const newState: LayoutState = { isMenuOpen: true };
    state.next(newState);
    fixture.detectChanges();
    expect(collapseDirective.isCollapsed).toBe(!newState.isMenuOpen);
  });
});
