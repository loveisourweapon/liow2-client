import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { AlertModule, CollapseModule, DropdownModule, ModalModule, TabsModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared';

import { AuthConfig } from './auth-config';
import { NavbarComponent } from './navbar';

@NgModule({
  imports: [
    Ng2UiAuthModule.forRoot(AuthConfig),

    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),

    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-AU' },
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ],
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only`);
    }
  }
}
