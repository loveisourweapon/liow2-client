import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { TitleService } from '../../core';
import { SameAsValidatorDirective } from '../../shared';
import {
  ActivatedRouteStubService,
  JumbtronStubComponent,
  StoreStubService,
  TitleStubService,
} from '../../../testing';
import { ResetPasswordComponent } from './reset-password.component';

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
          { provide: Store, useClass: StoreStubService },
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

  // TODO: add proper tests

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
