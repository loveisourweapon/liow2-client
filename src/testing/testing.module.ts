/**
 * This module is required for AOT compilation, it shouldn't need to be imported anywhere
 *
 * AOT compilation requires all components/services to belong to a module
 */

import { NgModule } from '@angular/core';

import {
  AlertStubComponent,
  DropdownStubDirective,
  DropdownMenuStubDirective,
  DropdownToggleStubDirective,
  ModalStubDirective,
  PaginationStubComponent,
  TabsetStubComponent,
  TabStubComponent,
  TypeaheadStubDirective,
} from './bootstrap-stubs';
import {
  ControlPanelPaginationStubComponent,
  ControlPanelSearchStubComponent,
  DeedListStubComponent,
  FeedStubComponent,
  IconCheckedStubComponent,
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
  RouterLinkActiveStubDirective,
  RouterOutletStubComponent,
  RouterStubService,
} from './router-stubs';
import {
  ActStubService,
  AlertifyStubService,
  AuthStubService,
  CampaignStubService,
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
    DropdownStubDirective,
    DropdownMenuStubDirective,
    DropdownToggleStubDirective,
    ModalStubDirective,
    PaginationStubComponent,
    TabsetStubComponent,
    TabStubComponent,
    TypeaheadStubDirective,

    ControlPanelPaginationStubComponent,
    ControlPanelSearchStubComponent,
    DeedListStubComponent,
    FeedStubComponent,
    IconCheckedStubComponent,
    JumbtronStubComponent,
    LoadingSpinnerStubComponent,
    MarkedStubComponent,
    MediumEditorStubComponent,
    SwitchStubComponent,
    UserPickerStubComponent,
    YoutubePlayerStubComponent,

    RouterLinkStubDirective,
    RouterLinkActiveStubDirective,
    RouterOutletStubComponent,
  ],
  providers: [
    ActivatedRouteStubService,
    RouterStubService,

    ActStubService,
    AlertifyStubService,
    AuthStubService,
    CampaignStubService,
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
