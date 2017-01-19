/**
 * This module is required for AOT compilation, it shouldn't need to be imported anywhere
 *
 * AOT compilation requires all components/services to belong to a module
 */

import { NgModule } from '@angular/core';

import { WelcomeStubComponent } from './component-stubs';
import { RouterOutletStubComponent } from './router-stubs';

@NgModule({
  declarations: [
    WelcomeStubComponent,

    RouterOutletStubComponent,
  ],
})
export class TestingModule { }
