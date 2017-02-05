import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { GlobalFeedComponent } from './global-feed';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'global', component: GlobalFeedComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class HomeRoutingModule { }
