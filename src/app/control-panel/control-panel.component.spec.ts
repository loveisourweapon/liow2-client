import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RouterLinkStubDirective, RouterOutletStubComponent, RouterStubService } from '../../testing';
import { StateService } from '../core/services';
import { ControlPanelComponent } from './control-panel.component';

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
          StateService,
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
