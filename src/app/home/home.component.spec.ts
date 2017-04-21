import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import {
  ActStubService,
  JumbtronStubComponent,
  ModalStubService,
  TitleStubService,
  YoutubePlayerStubComponent,
} from '../../testing';
import { ActService, ModalService, StateService, TitleService } from '../core/services';
import { HomeComponent } from './home.component';

// TODO: add proper tests

describe(`HomeComponent`, () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          HomeComponent,
          JumbtronStubComponent,
          WelcomeStubComponent,
          HomeFeedStubComponent,
          YoutubePlayerStubComponent,
        ],
        providers: [
          { provide: ActService, useClass: ActStubService },
          { provide: ModalService, useClass: ModalStubService },
          { provide: TitleService, useClass: TitleStubService },
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'liow-welcome',
  template: ``,
})
class WelcomeStubComponent { }

@Component({
  selector: 'liow-home-feed',
  template: ``,
})
class HomeFeedStubComponent {
  @Input() authUser: any;
  @Input() counters: any;
}
