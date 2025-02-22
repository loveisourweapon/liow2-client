import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlPanelComponent } from './control-panel.component';
import { CommentsComponent } from './comments';
import { DeedsComponent } from './deeds';
import { GroupComponent, GroupDetailComponent } from './group';
import { GroupsComponent } from './groups';
import { UserComponent } from './user';
import { UsersComponent } from './users';
import { ApproveGroupComponent } from './approve-group';

const controlPanelRoutes: Routes = [
  {
    path: 'control-panel',
    component: ControlPanelComponent,
    children: [
      { path: 'deeds', component: DeedsComponent, data: { title: 'Deeds' } },
      { path: 'groups', component: GroupsComponent, data: { title: 'Groups' } },
      {
        path: 'groups/:groupId',
        component: GroupComponent,
        data: { title: 'Group' },
        children: [
          { path: '', component: GroupDetailComponent },
          { path: 'users', component: UsersComponent },
          { path: 'testimonies', component: CommentsComponent },
        ],
      },
      { path: 'user', component: UserComponent, data: { title: 'User' } },
      { path: 'users', component: UsersComponent, data: { title: 'Users' } },

      { path: '', redirectTo: '/control-panel/user', pathMatch: 'full' },
    ],
  },
  { path: 'approve/:token', component: ApproveGroupComponent },
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
