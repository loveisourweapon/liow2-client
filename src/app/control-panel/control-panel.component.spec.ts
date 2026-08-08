import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import {
  CommentStubService,
  RouterLinkStubDirective,
  RouterOutletStubComponent,
  RouterStubService,
} from '../../testing';
import { CommentService, EnvironmentService, StateService } from '../core/services';
import { ControlPanelComponent } from './control-panel.component';

describe(`ControlPanelComponent`, () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelComponent, RouterLinkStubDirective, RouterOutletStubComponent],
      providers: [
        { provide: CommentService, useClass: CommentStubService },
        EnvironmentService,
        { provide: Router, useClass: RouterStubService },
        StateService,
      ],
    }).compileComponents();
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
