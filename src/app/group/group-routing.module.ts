import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupComponent } from './group.component';

const groupRoutes: Routes = [
  { path: 'g/:groupSlug', component: GroupComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(groupRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class GroupRoutingModule { }
