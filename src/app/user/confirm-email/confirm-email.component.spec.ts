import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertifyService, AuthService, TitleService } from '../../core/services';
import {
  ActivatedRouteStubService,
  AlertifyStubService,
  AuthStubService,
  JumbtronStubComponent,
  LoadingSpinnerStubComponent,
  RouterStubService,
  TitleStubService,
} from '../../../testing';
import { ConfirmEmailComponent } from './confirm-email.component';

// TODO: add proper tests

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
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: Router, useClass: RouterStubService },
          { provide: TitleService, useClass: TitleStubService },
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
