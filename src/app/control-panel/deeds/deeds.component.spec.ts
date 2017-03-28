import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TitleService } from '../../core';
import { LastPipe } from '../../shared';
import { State as AppState } from '../../store/reducer';
import {
  IconCheckedStubComponent,
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
  RouterLinkStubDirective,
  StoreStubService,
  TitleStubService,
} from '../../../testing';
import { DeedsComponent } from './deeds.component';

describe(`DeedsComponent`, () => {
  let fixture: ComponentFixture<DeedsComponent>;
  let component: DeedsComponent;
  let store: Store<AppState>;

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
          { provide: Store, useClass: StoreStubService },
          { provide: TitleService, useClass: TitleStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedsComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(Observable.of([]));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
