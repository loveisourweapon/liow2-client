import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import 'rxjs/add/operator/first';

import {
  ActStubService,
  AuthStubService,
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
  ModalStubService,
  NavbarSearchStubComponent,
  RouterLinkStubDirective,
} from '../../../testing';
import { ActService, AuthService, ModalService, StateService } from '../services';
import { NavbarComponent } from './navbar.component';

// TODO: add more tests around what's being displayed and clicking more buttons

describe(`NavbarComponent`, () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let element: DebugElement;
  let state: StateService;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          NavbarComponent,
          NavbarSearchStubComponent,
          DropdownStubDirective,
          DropdownMenuStubDirective,
          DropdownToggleStubDirective,
          RouterLinkStubDirective,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: ModalService, useClass: ModalStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    state = TestBed.get(StateService);

    fixture.detectChanges();
  });

  it(`should set the menu state to open when clicking the navbar toggle button`, () => {
    state.layout.isMenuOpen$.first()
      .subscribe((isMenuOpen: boolean) => expect(isMenuOpen).toBe(false));

    const toggleButton = element.query(By.css('button.navbar-toggle'));
    toggleButton.triggerEventHandler('click', null);

    state.layout.isMenuOpen$.first()
      .subscribe((isMenuOpen: boolean) => expect(isMenuOpen).toBe(true));
  });
});
