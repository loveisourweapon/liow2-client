import { NgModule } from '@angular/core';
import { AlertModule, DropdownModule, ModalModule, TabsModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';

@NgModule({
  imports: [
    AlertModule,
    DropdownModule,
    ModalModule,
    TabsModule,

    SharedModule,
    GroupRoutingModule,
  ],
  declarations: [
    GroupComponent,
  ],
})
export class GroupModule { }
