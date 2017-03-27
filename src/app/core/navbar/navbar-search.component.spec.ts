import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { StoreStubService, TypeaheadStubDirective } from '../../../testing';
import { NavbarSearchComponent } from './navbar-search.component';

describe(`NavbarSearchComponent`, () => {
  let component: NavbarSearchComponent;
  let fixture: ComponentFixture<NavbarSearchComponent>;

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
          { provide: Store, useClass: StoreStubService },
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
