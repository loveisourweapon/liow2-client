import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../shared';
import { ControlPanelRoutingModule } from './control-panel-routing.module';

import { ControlPanelComponent } from './control-panel.component';
import { ControlPanelPaginationComponent } from './pagination';
import { ControlPanelSearchComponent } from './search';
import { CommentsComponent } from './comments';
import { DeedsComponent } from './deeds';
import { GroupComponent, GroupDetailComponent } from './group';
import { GroupsComponent } from './groups';
import { UserComponent } from './user';
import { UsersComponent } from './users';
import { ApproveGroupComponent } from './approve-group';

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
    CommentsComponent,
    DeedsComponent,
    GroupComponent,
    GroupDetailComponent,
    GroupsComponent,
    UserComponent,
    UsersComponent,
    ApproveGroupComponent,
  ],
})
export class ControlPanelModule { }
