import { NgModule } from '@angular/core';
import { AlertModule } from 'ng2-bootstrap/alert';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';
import { TabsModule } from 'ng2-bootstrap/tabs';

import { SharedModule } from '../shared';
import { GroupRoutingModule } from './group-routing.module';

import { GroupComponent } from './group.component';

@NgModule({
  imports: [
    AlertModule,
    BsDropdownModule,
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
