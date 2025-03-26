import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule as Ng2ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DragulaModule } from 'ng2-dragula';

import { SharedModule } from '../shared';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalsComponent } from './modals.component';

import { CampaignEditModalComponent } from './campaign-edit';
import { ChangePasswordModalComponent } from './change-password';
import { DeedPreviewModalComponent } from './deed-preview';
import { ForgotPasswordModalComponent } from './forgot-password';
import { GroupEditModalComponent } from './group-edit';
import { GroupJoinModalComponent } from './group-join';
import { LoginModalComponent } from './login';
import { SalvationTestimonyModalComponent } from './salvation-testimony';
import { SignupModalComponent } from './signup';

@NgModule({
  imports: [
    SharedModule,
    AlertModule,
    Ng2ModalModule,
    TypeaheadModule,
    DragulaModule,
  ],
  declarations: [
    ModalHeaderComponent,
    ModalsComponent,

    CampaignEditModalComponent,
    ChangePasswordModalComponent,
    DeedPreviewModalComponent,
    ForgotPasswordModalComponent,
    GroupEditModalComponent,
    GroupJoinModalComponent,
    LoginModalComponent,
    SalvationTestimonyModalComponent,
    SignupModalComponent,
  ],
  exports: [
    ModalsComponent,
  ],
})
export class ModalModule { }
