import { NgModule, Optional, LOCALE_ID, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { CollapseModule, DropdownModule } from 'ng2-bootstrap';

import { reducer } from './reducers';
import { SharedModule } from '../shared';

import { NavbarComponent } from './navbar';

@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),

    CollapseModule.forRoot(),
    DropdownModule.forRoot(),

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
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
