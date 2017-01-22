/**
 * This module is required for AOT compilation, it shouldn't need to be imported anywhere
 *
 * AOT compilation requires all components/services to belong to a module
 */

import { NgModule } from '@angular/core';

import {
  CollapseStubDirective,
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
} from './bootstrap-stubs';
import {
  NavbarStubComponent,
  WelcomeStubComponent,
} from './component-stubs';
import {
  RouterLinkStubDirective,
  RouterOutletStubComponent,
} from './router-stubs';
import {
  HttpStubService,
  StoreStubService,
} from './service-stubs';

@NgModule({
  declarations: [
    CollapseStubDirective,
    DropdownStubDirective,
    DropdownMenuStubDirective,
    DropdownToggleStubDirective,

    NavbarStubComponent,
    WelcomeStubComponent,

    RouterLinkStubDirective,
    RouterOutletStubComponent,
  ],
  providers: [
    HttpStubService,
    StoreStubService,
  ],
})
export class TestingModule { }
