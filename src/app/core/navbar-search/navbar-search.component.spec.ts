import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DeedStubService, GroupStubService, RouterStubService, TypeaheadStubDirective } from '../../../testing';
import { DeedService, GroupService } from '../services';
import { NavbarSearchComponent } from './navbar-search.component';

// TODO: add proper tests

describe(`NavbarSearchComponent`, () => {
  let fixture: ComponentFixture<NavbarSearchComponent>;
  let component: NavbarSearchComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          NavbarSearchComponent,
          TypeaheadStubDirective,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: DeedService, useClass: DeedStubService },
          { provide: GroupService, useClass: GroupStubService },
          { provide: Router, useClass: RouterStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
