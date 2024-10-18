import { NgModule } from '@angular/core';
import { SelectModule } from 'ng2-select';
import { AlertModule } from 'ngx-bootstrap/alert';

import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { HomeFeedComponent } from './home-feed';
import { GlobalFeedComponent } from './global-feed';
import { AboutUsComponent } from './about-us';
import { ContactUsComponent } from './contact-us';
import { PrivacyPolicyComponent } from './privacy-policy';
import { WelcomeComponent } from './welcome';

@NgModule({
  imports: [
    SharedModule,
    SelectModule,
    AlertModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    HomeFeedComponent,
    GlobalFeedComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    WelcomeComponent,
  ],
})
export class HomeModule {}
