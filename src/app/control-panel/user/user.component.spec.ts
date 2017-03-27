import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TitleService } from '../../core';
import { MomentPipe } from '../../shared';
import { State as AppState } from '../../store/reducer';
import { IconCheckedStubComponent, StoreStubService, TitleStubService } from '../../../testing';
import { UserComponent } from './user.component';

describe(`UserComponent`, () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          UserComponent,
          MomentPipe,
          IconCheckedStubComponent,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: Store, useClass: StoreStubService },
          { provide: TitleService, useClass: TitleStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(Observable.of({}));

    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
