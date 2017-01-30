import { NgModule } from '@angular/core';
import { ModalModule as Ng2ModalModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalsComponent } from './modals.component';

import { LoginModalComponent } from './login';

@NgModule({
  imports: [
    SharedModule,
    Ng2ModalModule,
  ],
  declarations: [
    ModalHeaderComponent,
    ModalsComponent,

    LoginModalComponent,
  ],
  exports: [
    ModalsComponent,
  ],
})
export class ModalModule { }
