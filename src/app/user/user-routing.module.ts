import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { ConfirmEmailComponent } from './confirm-email';

const userRoutes: Routes = [
  { path: 'u/:userId', component: UserComponent },
  { path: 'confirm/:token', component: ConfirmEmailComponent },
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
