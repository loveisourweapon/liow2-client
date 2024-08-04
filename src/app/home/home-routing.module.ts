import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './about-us';
import { GlobalFeedComponent } from './global-feed';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'global', component: GlobalFeedComponent },
  { path: 'about', component: AboutUsComponent },
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
