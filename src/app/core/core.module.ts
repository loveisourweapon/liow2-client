import { NgModule, LOCALE_ID } from '@angular/core';

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'en-AU' },
  ],
})
export class CoreModule { }
