import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { ConfirmEmailComponent } from './confirm-email';
import { ResetPasswordComponent } from './reset-password';

const userRoutes: Routes = [
  { path: 'u/:userId', component: UserComponent },
  { path: 'confirm/:token', component: ConfirmEmailComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
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
