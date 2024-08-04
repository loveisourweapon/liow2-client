import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { HomeFeedComponent } from './home-feed';
import { GlobalFeedComponent } from './global-feed';
import { AboutUsComponent } from './about-us';
import { WelcomeComponent } from './welcome';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    HomeFeedComponent,
    GlobalFeedComponent,
    AboutUsComponent,
    WelcomeComponent,
  ],
})
export class HomeModule { }
