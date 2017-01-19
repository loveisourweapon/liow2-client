import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import {
  CollapseStubDirective,
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
  RouterLinkStubDirective,
} from '../../../testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let element: DebugElement;

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
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it(`should set isCollapsed when setCollapsed is passed a boolean`, () => {
    expect(component.isCollapsed).toBe(true);
    component.setCollapsed(false);
    expect(component.isCollapsed).toBe(false);
  });

  it(`should toggle isCollapsed when navbar toggle button is clicked`, () => {
    const toggleButton = element.query(By.css('button.navbar-toggle'));

    expect(component.isCollapsed).toBe(true);
    toggleButton.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.isCollapsed).toBe(false);
  });

  it(`should collapse the navbar when clicking a router link`, () => {
    const routerLink = element.query(By.css('ul.navbar-right > li:first-child > a'));

    component.isCollapsed = false;
    routerLink.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.isCollapsed).toBe(true);
  });

  it(`should pass isCollapsed state to [collapse] directive`, () => {
    const collapseElement = element.query(By.directive(CollapseStubDirective));
    const collapseDirective = collapseElement.injector.get(CollapseStubDirective);

    expect(collapseDirective.isCollapsed).toBe(true);
    component.setCollapsed(false);
    fixture.detectChanges();
    expect(collapseDirective.isCollapsed).toBe(false);
  });
});
