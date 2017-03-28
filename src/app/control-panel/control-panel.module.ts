import { NgModule } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { SharedModule } from '../shared';
import { ControlPanelRoutingModule } from './control-panel-routing.module';

import { ControlPanelComponent } from './control-panel.component';
import { DeedsComponent } from './deeds';
import { GroupComponent } from './group';
import { GroupsComponent } from './groups';
import { UserComponent } from './user';
import { UsersComponent } from './users';

@NgModule({
  imports: [
    DropdownModule,
    SharedModule,
    ControlPanelRoutingModule,
  ],
  declarations: [
    ControlPanelComponent,
    DeedsComponent,
    GroupComponent,
    GroupsComponent,
    UserComponent,
    UsersComponent,
  ],
})
export class ControlPanelModule { }
