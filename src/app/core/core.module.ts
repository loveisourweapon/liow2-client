import { NgModule, Optional, LOCALE_ID, SkipSelf } from '@angular/core';
import { CollapseModule, DropdownModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared';

import { API_BASE_URL, apiBaseUrlFactory } from './config';
import { NavbarComponent } from './navbar';

@NgModule({
  imports: [
    CollapseModule.forRoot(),
    DropdownModule.forRoot(),

    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-AU' },
    { provide: API_BASE_URL, useFactory: apiBaseUrlFactory },
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
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
