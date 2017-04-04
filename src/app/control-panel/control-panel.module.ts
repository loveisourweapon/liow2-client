import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';
import { PaginationModule } from 'ng2-bootstrap/pagination';

import { SharedModule } from '../shared';
import { ControlPanelRoutingModule } from './control-panel-routing.module';

import { ControlPanelComponent } from './control-panel.component';
import { ControlPanelPaginationComponent } from './pagination';
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
    PaginationModule,
    SharedModule,
    ControlPanelRoutingModule,
  ],
  declarations: [
    ControlPanelComponent,
    ControlPanelPaginationComponent,
    ControlPanelSearchComponent,
    DeedsComponent,
    GroupComponent,
    GroupsComponent,
    UserComponent,
    UsersComponent,
  ],
})
export class ControlPanelModule { }
