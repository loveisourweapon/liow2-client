import { NgModule } from '@angular/core';
import { AlertModule, ModalModule as Ng2ModalModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalsComponent } from './modals.component';

import { ForgotPasswordModalComponent } from './forgot-password';
import { LoginModalComponent } from './login';
import { SignupModalComponent } from './signup';

@NgModule({
  imports: [
    SharedModule,
    AlertModule,
    Ng2ModalModule,
  ],
  declarations: [
    ModalHeaderComponent,
    ModalsComponent,

    ForgotPasswordModalComponent,
    LoginModalComponent,
    SignupModalComponent,
  ],
  exports: [
    ModalsComponent,
  ],
})
export class ModalModule { }
