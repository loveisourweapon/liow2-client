import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { StateService } from '../core/services';
import { ModalsComponent } from './modals.component';

// TODO: Add proper tests!

describe(`ModalsComponent`, () => {
  let fixture: ComponentFixture<ModalsComponent>;
  let component: ModalsComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ModalsComponent,
          CampaignEditModalStubComponent,
          ChangePasswordModalStubComponent,
          DeedPreviewModalStubComponent,
          ForgotPasswordModalStubComponent,
          GroupEditModalStubComponent,
          GroupJoinModalStubComponent,
          LoginModalStubComponent,
          SignupModalStubComponent,
        ],
        providers: [
          StateService,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'liow-campaign-edit-modal',
  template: ``,
})
class CampaignEditModalStubComponent {
  @Input() group: any;
}

@Component({
  selector: 'liow-change-password-modal',
  template: ``,
})
class ChangePasswordModalStubComponent { }

@Component({
  selector: 'liow-deed-preview-modal',
  template: ``,
})
class DeedPreviewModalStubComponent { }

@Component({
  selector: 'liow-forgot-password-modal',
  template: ``,
})
class ForgotPasswordModalStubComponent { }

@Component({
  selector: 'liow-group-edit-modal',
  template: ``,
})
class GroupEditModalStubComponent {
  @Input() isAuthenticated: boolean;
  @Input() authUser: any;
}

@Component({
  selector: 'liow-group-join-modal',
  template: ``,
})
class GroupJoinModalStubComponent { }

@Component({
  selector: 'liow-login-modal',
  template: ``,
})
class LoginModalStubComponent {
  @Input() group: any;
}

@Component({
  selector: 'liow-signup-modal',
  template: ``,
})
class SignupModalStubComponent {
  @Input() group: any;
}
