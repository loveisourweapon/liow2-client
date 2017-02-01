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
  ModalStubDirective,
  TabsetStubComponent,
  TabStubComponent,
} from './bootstrap-stubs';
import {
  DeedListStubComponent,
  JumbtronStubComponent,
  MarkedStubComponent,
} from './component-stubs';
import {
  ActivatedRouteStubService,
  RouterLinkStubDirective,
  RouterOutletStubComponent,
  RouterStubService,
} from './router-stubs';
import {
  ActStubService,
  AuthStubService,
  DeedStubService,
  GroupStubService,
  HttpStubService,
  Ng2AuthStubService,
  StoreStubService,
  UserStubService,
} from './service-stubs';

@NgModule({
  declarations: [
    CollapseStubDirective,
    DropdownStubDirective,
    DropdownMenuStubDirective,
    DropdownToggleStubDirective,
    ModalStubDirective,
    TabsetStubComponent,
    TabStubComponent,

    DeedListStubComponent,
    JumbtronStubComponent,
    MarkedStubComponent,

    RouterLinkStubDirective,
    RouterOutletStubComponent,
  ],
  providers: [
    ActivatedRouteStubService,
    RouterStubService,

    ActStubService,
    AuthStubService,
    DeedStubService,
    GroupStubService,
    HttpStubService,
    Ng2AuthStubService,
    StoreStubService,
    UserStubService,
  ],
})
export class TestingModule { }
