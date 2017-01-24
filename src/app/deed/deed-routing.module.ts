import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeedComponent } from './deed.component';

const deedRoutes: Routes = [
  { path: 'd/:deedSlug', component: DeedComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(deedRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class DeedRoutingModule { }
