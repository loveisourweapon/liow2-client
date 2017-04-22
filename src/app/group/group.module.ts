import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

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
