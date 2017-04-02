import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';

import { SharedModule } from '../shared';
import { ControlPanelRoutingModule } from './control-panel-routing.module';

import { ControlPanelComponent } from './control-panel.component';
import { ControlPanelSearchComponent } from './search';
import { DeedsComponent } from './deeds';
import { GroupComponent } from './group';
import { GroupsComponent } from './groups';
import { UserComponent } from './user';
import { UsersComponent } from './users';

@NgModule({
  imports: [
    BsDropdownModule,
    ModalModule,
    SharedModule,
    ControlPanelRoutingModule,
  ],
  declarations: [
    ControlPanelComponent,
    ControlPanelSearchComponent,
    DeedsComponent,
    GroupComponent,
    GroupsComponent,
    UserComponent,
    UsersComponent,
  ],
})
export class ControlPanelModule { }
