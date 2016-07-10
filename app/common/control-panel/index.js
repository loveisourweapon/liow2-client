import angular from 'angular';
import { ControlPanelComponent } from './control-panel.component';
import { ControlPanelSearchComponent } from './control-panel-search.component';
import { UserControlPanelComponent } from './user-control-panel';
import { GroupControlPanelComponent } from './group-control-panel';
import { DeedsControlPanelComponent } from './deeds-control-panel';
import { UsersControlPanelComponent } from './users-control-panel';
import { GroupsControlPanelComponent } from './groups-control-panel';

const controlPanel = angular
  .module('controlPanel', [])
  .component('controlPanel', ControlPanelComponent)
  .component('controlPanelSearch', ControlPanelSearchComponent)
  .component('userControlPanel', UserControlPanelComponent)
  .component('groupControlPanel', GroupControlPanelComponent)
  .component('deedsControlPanel', DeedsControlPanelComponent)
  .component('usersControlPanel', UsersControlPanelComponent)
  .component('groupsControlPanel', GroupsControlPanelComponent)
  .name;

export default controlPanel;
