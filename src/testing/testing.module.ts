/**
 * This module is required for AOT compilation, it shouldn't need to be imported anywhere
 *
 * AOT compilation requires all components/services to belong to a module
 */

import { NgModule } from '@angular/core';

import {
  AlertStubComponent,
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
  FeedStubComponent,
  JumbtronStubComponent,
  LoadingSpinnerStubComponent,
  MarkedStubComponent,
  MediumEditorStubComponent,
  SwitchStubComponent,
  UserPickerStubComponent,
  YoutubePlayerStubComponent,
} from './component-stubs';
import {
  ActivatedRouteStubService,
  RouterLinkStubDirective,
  RouterOutletStubComponent,
  RouterStubService,
} from './router-stubs';
import {
  ActStubService,
  AlertifyStubService,
  AuthStubService,
  CommentStubService,
  DeedStubService,
  FeedStubService,
  GroupStubService,
  HttpStubService,
  Ng2AuthStubService,
  StoreStubService,
  TitleStubService,
  UserStubService,
} from './service-stubs';

@NgModule({
  declarations: [
    AlertStubComponent,
    CollapseStubDirective,
    DropdownStubDirective,
    DropdownMenuStubDirective,
    DropdownToggleStubDirective,
    ModalStubDirective,
    TabsetStubComponent,
    TabStubComponent,

    DeedListStubComponent,
    FeedStubComponent,
    JumbtronStubComponent,
    LoadingSpinnerStubComponent,
    MarkedStubComponent,
    MediumEditorStubComponent,
    SwitchStubComponent,
    UserPickerStubComponent,
    YoutubePlayerStubComponent,

    RouterLinkStubDirective,
    RouterOutletStubComponent,
  ],
  providers: [
    ActivatedRouteStubService,
    RouterStubService,

    ActStubService,
    AlertifyStubService,
    AuthStubService,
    CommentStubService,
    DeedStubService,
    FeedStubService,
    GroupStubService,
    HttpStubService,
    Ng2AuthStubService,
    StoreStubService,
    TitleStubService,
    UserStubService,
  ],
})
export class TestingModule { }
