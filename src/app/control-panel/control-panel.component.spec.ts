import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ControlPanelComponent } from './control-panel.component';
import { RouterLinkStubDirective, RouterOutletStubComponent, RouterStubService, StoreStubService } from '../../testing';

describe(`ControlPanelComponent`, () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

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
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
