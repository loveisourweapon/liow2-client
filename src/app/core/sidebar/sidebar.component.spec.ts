import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SidebarComponent } from './sidebar.component';
import { State as AppState } from '../../store/reducer';
import { RouterLinkStubDirective, StoreStubService } from '../../../testing';

describe(`SidebarComponent`, () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;
  let element: DebugElement;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          SidebarComponent,
          NavbarSearchStubComponent,
          RouterLinkStubDirective,
        ],
        providers: [
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

    // TODO: this is fragile, need a utility for mocking @ngrx/store selectors
    store = element.injector.get(Store);
    spyOn(store, 'select').and.returnValue(Observable.of(false));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'liow-navbar-search',
  template: ``,
})
class NavbarSearchStubComponent { }
