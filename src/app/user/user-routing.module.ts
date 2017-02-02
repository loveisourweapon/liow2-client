import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';

const userRoutes: Routes = [
  { path: 'u/:userId', component: UserComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class UserRoutingModule { }
