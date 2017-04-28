import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import {
  AuthStubService,
  ModalStubDirective,
  NavbarSearchStubComponent,
  RouterLinkStubDirective,
} from '../../../testing';
import { AuthService, ModalService, StateService } from '../services';
import { SidebarComponent } from './sidebar.component';

// TODO: add proper tests

describe(`SidebarComponent`, () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          SidebarComponent,
          NavbarSearchStubComponent,
          RouterLinkStubDirective,
        ],
        providers: [
          { provide: AuthService, useClass: AuthStubService },
          { provide: ModalService, useClass: ModalStubDirective },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
