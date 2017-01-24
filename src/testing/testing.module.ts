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
  DeedListStubComponent,
  DeedListHorizontalStubComponent,
  DeedListVerticalStubComponent,
  NavbarStubComponent,
  WelcomeStubComponent,
  JumbtronStubComponent,
} from './component-stubs';
import {
  ActivatedRouteStubService,
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

    DeedListStubComponent,
    DeedListHorizontalStubComponent,
    DeedListVerticalStubComponent,
    NavbarStubComponent,
    WelcomeStubComponent,
    JumbtronStubComponent,

    RouterLinkStubDirective,
    RouterOutletStubComponent,
  ],
  providers: [
    ActivatedRouteStubService,

    HttpStubService,
    StoreStubService,
  ],
})
export class TestingModule { }
