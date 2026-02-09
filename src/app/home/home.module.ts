import { NgModule } from '@angular/core';
import { SelectModule } from 'ng2-select';
import { AlertModule } from 'ngx-bootstrap/alert';

import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { HomeFeedComponent } from './home-feed';
import { GlobalFeedComponent } from './global-feed';
import { AboutUsComponent, AboutUsLiowComponent, AboutUsBeKindComponent } from './about-us';
import { ContactUsComponent } from './contact-us';
import {
  EasterCampaignComponent,
  EasterCampaignLiowComponent,
  EasterCampaignBeKindComponent,
} from './easter-campaign';
import {
  PrivacyPolicyComponent,
  PrivacyPolicyLiowComponent,
  PrivacyPolicyBeKindComponent,
} from './privacy-policy';
import {
  TermsAndConditionsComponent,
  TermsAndConditionsLiowComponent,
  TermsAndConditionsBeKindComponent,
} from './terms-and-conditions';
import { FAQsComponent, FAQsLiowComponent, FAQsBeKindComponent } from './faqs';
import { WelcomeComponent } from './welcome';

@NgModule({
  imports: [SharedModule, SelectModule, AlertModule, HomeRoutingModule],
  declarations: [
    HomeComponent,
    HomeFeedComponent,
    GlobalFeedComponent,
    AboutUsComponent,
    AboutUsLiowComponent,
    AboutUsBeKindComponent,
    ContactUsComponent,
    EasterCampaignComponent,
    EasterCampaignLiowComponent,
    EasterCampaignBeKindComponent,
    PrivacyPolicyComponent,
    PrivacyPolicyLiowComponent,
    PrivacyPolicyBeKindComponent,
    TermsAndConditionsComponent,
    TermsAndConditionsLiowComponent,
    TermsAndConditionsBeKindComponent,
    FAQsComponent,
    FAQsLiowComponent,
    FAQsBeKindComponent,
    WelcomeComponent,
  ],
})
export class HomeModule {}
