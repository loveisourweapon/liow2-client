import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ControlPanelComponent } from './control-panel.component';
import { State as AppState } from '../store/reducer';
import { RouterLinkStubDirective, RouterOutletStubComponent, RouterStubService, StoreStubService } from '../../testing';

describe(`ControlPanelComponent`, () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ControlPanelComponent,
          RouterLinkStubDirective,
          RouterOutletStubComponent
        ],
        providers: [
          { provide: Router, useClass: RouterStubService },
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(Observable.of({}));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
