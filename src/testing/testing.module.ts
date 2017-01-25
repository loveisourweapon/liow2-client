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
  JumbtronStubComponent,
} from './component-stubs';
import {
  ActivatedRouteStubService,
  RouterLinkStubDirective,
  RouterOutletStubComponent,
} from './router-stubs';
import {
  DeedStubService,
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
    JumbtronStubComponent,

    RouterLinkStubDirective,
    RouterOutletStubComponent,
  ],
  providers: [
    ActivatedRouteStubService,

    DeedStubService,
    HttpStubService,
    StoreStubService,
  ],
})
export class TestingModule { }
