import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './about-us';
import { ContactUsComponent } from './contact-us';
import { FAQsComponent } from './faqs';
import { GlobalFeedComponent } from './global-feed';
import { HomeComponent } from './home.component';
import { PrivacyPolicyComponent } from './privacy-policy';
import { TermsAndConditionsComponent } from './terms-and-conditions';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'global', component: GlobalFeedComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'faqs', component: FAQsComponent },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: 'contact', component: ContactUsComponent },
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
