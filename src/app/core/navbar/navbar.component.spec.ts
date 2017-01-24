import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { NavbarComponent } from './navbar.component';
import * as layout from '../../store/actions/layout';
import * as fromLayout from '../../store/reducers/layout';
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
  let store: Store<fromLayout.State>;

  const isMenuOpen = false;
  let isMenuOpen$: BehaviorSubject<boolean>;

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
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

    store = TestBed.get(Store);
    isMenuOpen$ = new BehaviorSubject(isMenuOpen);
    spyOn(TestBed.get(Store), 'select').and.returnValue(isMenuOpen$);

    fixture.detectChanges();
  });

  it(`should get the isMenuOpen state from store`, () => {
    component.isMenuOpen$.subscribe((isMenuOpen: boolean) => {
      expect(isMenuOpen).toBe(isMenuOpen);
    });
  });

  it(`should trigger TOGGLE_MENU when clicking the navbar toggle button`, () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const toggleButton = element.query(By.css('button.navbar-toggle'));
    toggleButton.triggerEventHandler('click', new MouseEvent('click'));
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe(layout.ActionTypes.TOGGLE_MENU);
  });

  it(`should trigger CLOSE_MENU when clicking a router link`, () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const routerLink = element.query(By.css('ul.navbar-right > li:first-child > a'));
    routerLink.triggerEventHandler('click', new MouseEvent('click'));
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe(layout.ActionTypes.CLOSE_MENU);
  });

  it(`should pass isCollapsed state to [collapse] directive`, () => {
    const collapseElement = element.query(By.directive(CollapseStubDirective));
    const collapseDirective = collapseElement.injector.get(CollapseStubDirective);
    expect(collapseDirective.isCollapsed).toBe(!isMenuOpen);

    const newState = true;
    isMenuOpen$.next(newState);
    fixture.detectChanges();
    expect(collapseDirective.isCollapsed).toBe(!newState);
  });
});
