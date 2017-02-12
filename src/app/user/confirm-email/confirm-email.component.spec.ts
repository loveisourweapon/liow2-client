import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ConfirmEmailComponent } from './confirm-email.component';
import {
  ActivatedRouteStubService,
  JumbtronStubComponent,
  LoadingSpinnerStubComponent,
  StoreStubService,
} from '../../../testing';

describe(`ConfirmEmailComponent`, () => {
  let fixture: ComponentFixture<ConfirmEmailComponent>;
  let component: ConfirmEmailComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ConfirmEmailComponent,
          JumbtronStubComponent,
          LoadingSpinnerStubComponent,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
