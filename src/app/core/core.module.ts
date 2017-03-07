import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { AlertModule, DropdownModule, ModalModule, TabsModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared';

import { AuthConfig } from './auth-config';
import { NavbarComponent } from './navbar';
import { SidebarComponent } from './sidebar';
import { TitleService } from './title.service';

@NgModule({
  imports: [
    Ng2UiAuthModule.forRoot(AuthConfig),

    AlertModule.forRoot(),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),

    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-AU' },
    TitleService,
  ],
  declarations: [
    NavbarComponent,
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
