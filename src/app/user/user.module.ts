import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ConfirmEmailComponent } from './confirm-email';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
  ],
  declarations: [
    UserComponent,
    ConfirmEmailComponent,
  ],
})
export class UserModule { }
