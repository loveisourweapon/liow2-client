import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ActivatedRouteStubService,
  ActStubService,
  AlertifyStubService,
  AlertStubComponent,
  AuthStubService,
  CampaignStubService,
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
  FeedStubComponent,
  GroupStubService,
  JumbtronStubComponent,
  MarkedStubComponent,
  ModalStubDirective,
  ModalStubService,
  RouterLinkStubDirective,
  RouterStubService,
  TabsetStubComponent,
  TabStubComponent,
  TitleStubService,
  UserStubService,
} from '../../testing';
import {
  ActService,
  AlertifyService,
  AuthService,
  CampaignService,
  GroupService,
  ModalService,
  StateService,
  TitleService,
  UserService,
} from '../core/services';
import { GroupComponent } from './group.component';

// TODO: Add proper tests!

describe(`GroupComponent`, () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupComponent,
          AlertStubComponent,
          DropdownStubDirective,
          DropdownMenuStubDirective,
          DropdownToggleStubDirective,
          FeedStubComponent,
          JumbtronStubComponent,
          MarkedStubComponent,
          ModalStubDirective,
          RouterLinkStubDirective,
          TabsetStubComponent,
          TabStubComponent,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: CampaignService, useClass: CampaignStubService },
          { provide: GroupService, useClass: GroupStubService },
          { provide: ModalService, useClass: ModalStubService },
          { provide: Router, useClass: RouterStubService },
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
