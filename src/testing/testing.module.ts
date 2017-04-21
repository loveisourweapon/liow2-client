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
  NavbarSearchStubComponent,
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
  ModalStubService,
  Ng2AuthStubService,
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
    NavbarSearchStubComponent,
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
    ModalStubService,
    Ng2AuthStubService,
    TitleStubService,
    UserStubService,
  ],
})
export class TestingModule { }
