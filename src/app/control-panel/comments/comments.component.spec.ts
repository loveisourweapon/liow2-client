import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  ActivatedRouteStubService,
  CommentStubService,
  ControlPanelPaginationStubComponent,
  ControlPanelSearchStubComponent,
  MarkedStubComponent,
  RouterStubService,
  TitleStubService,
} from '../../../testing';
import { CommentService, StateService, TitleService } from '../../core/services';
import { MomentPipe } from '../../shared';
import { CommentsComponent } from './comments.component';

// TODO: add proper tests

describe(`CommentsComponent`, () => {
  let fixture: ComponentFixture<CommentsComponent>;
  let component: CommentsComponent;
  let commentService: CommentService;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          CommentsComponent,
          ControlPanelPaginationStubComponent,
          ControlPanelSearchStubComponent,
          MarkedStubComponent,
          MomentPipe,
        ],
        providers: [
          { provide: CommentService, useClass: CommentStubService },
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: Router, useClass: RouterStubService },
          StateService,
          { provide: TitleService, useClass: TitleStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;

    commentService = TestBed.get(CommentService);
    spyOn(commentService, 'find').and.returnValue(Observable.of([]));
    spyOn(commentService, 'count').and.returnValue(Observable.of(0));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
