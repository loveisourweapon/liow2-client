import { NgModule, Optional, LOCALE_ID, SkipSelf } from '@angular/core';

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'en-AU' },
  ],
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
