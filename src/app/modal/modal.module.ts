import { NgModule } from '@angular/core';
import { AlertModule, ModalModule as Ng2ModalModule } from 'ng2-bootstrap';
import { DragulaModule } from 'ng2-dragula';

import { SharedModule } from '../shared';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalsComponent } from './modals.component';

import { CampaignEditModalComponent } from './campaign-edit';
import { ForgotPasswordModalComponent } from './forgot-password';
import { GroupEditModalComponent } from './group-edit';
import { LoginModalComponent } from './login';
import { SignupModalComponent } from './signup';

@NgModule({
  imports: [
    SharedModule,
    AlertModule,
    Ng2ModalModule,
    DragulaModule,
  ],
  declarations: [
    ModalHeaderComponent,
    ModalsComponent,

    CampaignEditModalComponent,
    ForgotPasswordModalComponent,
    GroupEditModalComponent,
    LoginModalComponent,
    SignupModalComponent,
  ],
  exports: [
    ModalsComponent,
  ],
})
export class ModalModule { }
