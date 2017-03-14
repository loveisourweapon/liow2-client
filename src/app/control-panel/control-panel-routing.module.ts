import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlPanelComponent } from './control-panel.component';
import { DeedsComponent } from './deeds';
import { GroupComponent } from './group';
import { GroupsComponent } from './groups';
import { UserComponent } from './user';
import { UsersComponent } from './users';

const controlPanelRoutes: Routes = [
  {
    path: 'control-panel',
    component: ControlPanelComponent,
    children: [
      { path: 'deeds', component: DeedsComponent, data: { title: 'Deeds' } },
      { path: 'group/:groupId', component: GroupComponent, data: { title: 'Group' } },
      { path: 'groups', component: GroupsComponent, data: { title: 'Groups' } },
      { path: 'user', component: UserComponent, data: { title: 'User' } },
      { path: 'users', component: UsersComponent, data: { title: 'Users' } },

      { path: '', redirectTo: '/control-panel/user', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(controlPanelRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ControlPanelRoutingModule { }
