import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ActStubService,
  ActivatedRouteStubService,
  AlertifyStubService,
  CommentStubService,
  DeedListStubComponent,
  DeedStubService,
  FeedStubComponent,
  JumbtronStubComponent,
  MarkedStubComponent,
  ModalStubService,
  TitleStubService,
  YoutubePlayerStubComponent,
} from '../../testing';
import {
  ActService,
  AlertifyService,
  CommentService,
  DeedService,
  ModalService,
  StateService,
  TitleService,
} from '../core/services';
import { DeedComponent } from './deed.component';

// TODO: Add proper tests!

describe(`DeedComponent`, () => {
  let fixture: ComponentFixture<DeedComponent>;
  let component: DeedComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedComponent,
          CommentFormStubComponent,
          DeedListStubComponent,
          FeedStubComponent,
          JumbtronStubComponent,
          MarkedStubComponent,
          YoutubePlayerStubComponent,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: CommentService, useClass: CommentStubService },
          { provide: DeedService, useClass: DeedStubService },
          { provide: ModalService, useClass: ModalStubService },
          StateService,
          { provide: TitleService, useClass: TitleStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'liow-comment-form',
  template: ``,
})
class CommentFormStubComponent {
  @Input() content: string;
  @Input() isSaving: boolean;
  @Output() change = new EventEmitter();
  @Output() save = new EventEmitter();
}
