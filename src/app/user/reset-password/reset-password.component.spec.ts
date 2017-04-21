import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertifyService, AuthService, ModalService, TitleService } from '../../core/services';
import { SameAsValidatorDirective } from '../../shared';
import {
  AlertifyStubService,
  AuthStubService,
  ActivatedRouteStubService,
  JumbtronStubComponent,
  ModalStubService,
  RouterStubService,
  TitleStubService,
} from '../../../testing';
import { ResetPasswordComponent } from './reset-password.component';

// TODO: add proper tests

describe(`ResetPasswordComponent`, () => {
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let component: ResetPasswordComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ResetPasswordComponent,
          JumbtronStubComponent,
          SameAsValidatorDirective,
        ],
        imports: [
          FormsModule,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
          { provide: AlertifyService, useClass: AlertifyStubService },
          { provide: AuthService, useClass: AuthStubService },
          { provide: ModalService, useClass: ModalStubService },
          { provide: Router, useClass: RouterStubService },
          { provide: TitleService, useClass: TitleStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
