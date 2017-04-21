import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  ActivatedRouteStubService,
  ControlPanelPaginationStubComponent,
  ControlPanelSearchStubComponent,
  GroupStubService,
  MarkedStubComponent,
  ModalStubDirective,
  RouterLinkStubDirective,
  RouterStubService,
  TitleStubService,
} from '../../../testing';
import { GroupService, TitleService } from '../../core/services';
import { MomentPipe } from '../../shared';
import { GroupsComponent } from './groups.component';

// TODO: add proper tests

describe(`GroupsComponent`, () => {
  let fixture: ComponentFixture<GroupsComponent>;
  let component: GroupsComponent;
  let groupService: GroupService;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          GroupsComponent,
          ControlPanelPaginationStubComponent,
          ControlPanelSearchStubComponent,
          MarkedStubComponent,
          ModalStubDirective,
          RouterLinkStubDirective,
          MomentPipe,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: GroupService, useClass: GroupStubService },
          { provide: Router, useClass: RouterStubService },
          { provide: TitleService, useClass: TitleStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;

    groupService = TestBed.get(GroupService);
    spyOn(groupService, 'find').and.returnValue(Observable.of([]));
    spyOn(groupService, 'count').and.returnValue(Observable.of(0));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
