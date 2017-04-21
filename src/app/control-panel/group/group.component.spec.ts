import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import {
  ActStubService,
  ActivatedRouteStubService,
  GroupStubService,
  MarkedStubComponent,
  ModalStubService,
  RouterLinkStubDirective,
  RouterLinkActiveStubDirective,
  RouterOutletStubComponent,
  TitleStubService,
  UserStubService,
} from '../../../testing';
import { ActService, GroupService, ModalService, StateService, TitleService, UserService } from '../../core/services';
import { MomentPipe } from '../../shared';
import { GroupComponent } from './group.component';

// TODO: add proper tests

describe(`GroupComponent`, () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupComponent,
          MarkedStubComponent,
          MomentPipe,
          RouterLinkStubDirective,
          RouterLinkActiveStubDirective,
          RouterOutletStubComponent,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: GroupService, useClass: GroupStubService },
          { provide: ModalService, useClass: ModalStubService },
          StateService,
          { provide: TitleService, useClass: TitleStubService },
          { provide: UserService, useClass: UserStubService },
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
