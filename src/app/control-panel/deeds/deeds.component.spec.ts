import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  IconCheckedStubComponent,
  DeedStubService,
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
  ModalStubService,
  RouterLinkStubDirective,
  TitleStubService,
} from '../../../testing';
import { DeedService, ModalService, TitleService } from '../../core/services';
import { LastPipe } from '../../shared';
import { DeedsComponent } from './deeds.component';

// TODO: add proper tests

describe(`DeedsComponent`, () => {
  let fixture: ComponentFixture<DeedsComponent>;
  let component: DeedsComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedsComponent,
          LastPipe,
          IconCheckedStubComponent,
          DropdownStubDirective,
          DropdownMenuStubDirective,
          DropdownToggleStubDirective,
          RouterLinkStubDirective,
        ],
        providers: [
          { provide: DeedService, useClass: DeedStubService },
          { provide: ModalService, useClass: ModalStubService },
          { provide: TitleService, useClass: TitleStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
