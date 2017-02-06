import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome';
import { HomeFeedComponent } from './home-feed';
import { GlobalFeedComponent } from './global-feed';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    WelcomeComponent,
    HomeFeedComponent,
    GlobalFeedComponent,
  ],
})
export class HomeModule { }
