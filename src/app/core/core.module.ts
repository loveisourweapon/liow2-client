import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { AlertModule } from 'ng2-bootstrap/alert';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';

// Hardcode locale to en-AU
const locale = 'en-AU';
import * as moment from 'moment';
moment.locale(locale);

import { SharedModule } from '../shared';

import { AuthConfig } from './auth-config';
import { NavbarComponent, NavbarSearchComponent } from './navbar';
import { SidebarComponent } from './sidebar';
import { TitleService } from './title.service';

@NgModule({
  imports: [
    Ng2UiAuthModule.forRoot(AuthConfig),

    AlertModule.forRoot(),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),

    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: locale },
    TitleService,
  ],
  declarations: [
    NavbarComponent,
    NavbarSearchComponent,
    SidebarComponent,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
  ],
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only`);
    }
  }
}
