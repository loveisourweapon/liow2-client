import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import {
  ActivatedRouteStubService,
  AuthStubService,
  GroupStubService,
  ModalStubService,
  RouterLinkStubDirective,
  RouterLinkActiveStubDirective,
  RouterOutletStubComponent,
} from '../../../testing';
import { AuthService, GroupService, ModalService, StateService } from '../../core/services';
import { GroupComponent } from './group.component';

// TODO: add proper tests

describe(`GroupComponent`, () => {
  let fixture: ComponentFixture<GroupComponent>;
  let component: GroupComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupComponent,
          RouterLinkStubDirective,
          RouterLinkActiveStubDirective,
          RouterOutletStubComponent,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: GroupService, useClass: GroupStubService },
          { provide: ModalService, useClass: ModalStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
