import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

// Hardcode locale to en-AU
const locale = 'en-AU';
import * as moment from 'moment';
moment.locale(locale);

import { SharedModule } from '../shared';

import { AuthConfig } from './auth-config';
import { NavbarComponent } from './navbar';
import { NavbarSearchComponent } from './navbar-search';
import {
  PromoBannerComponent,
  PromoBannerLiowComponent,
  PromoBannerBekindComponent,
} from './promo-banner';
import { SidebarComponent } from './sidebar';
import {
  ActService,
  AlertifyService,
  AuthService,
  CampaignService,
  CommentService,
  DeedService,
  EnvironmentService,
  FeedService,
  GroupService,
  ModalService,
  StateService,
  TitleService,
  UserService,
} from './services';

@NgModule({
  imports: [
    Ng2UiAuthModule.forRoot(AuthConfig),

    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),

    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: locale },
    ActService,
    AlertifyService,
    AuthService,
    CampaignService,
    CommentService,
    DeedService,
    EnvironmentService,
    FeedService,
    GroupService,
    ModalService,
    StateService,
    Title,
    TitleService,
    UserService,
  ],
  declarations: [
    NavbarComponent,
    NavbarSearchComponent,
    PromoBannerComponent,
    PromoBannerLiowComponent,
    PromoBannerBekindComponent,
    SidebarComponent,
  ],
  exports: [NavbarComponent, PromoBannerComponent, SidebarComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only`);
    }
  }
}
