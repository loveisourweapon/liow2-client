import angular from 'angular';
import ControlPanelComponent from './control-panel.component';
import UserControlPanelComponent from './user-control-panel.component';
import GroupControlPanelComponent from './group-control-panel.component';
import DeedsControlPanelComponent from './deeds-control-panel.component';
import UsersControlPanelComponent from './users-control-panel.component';
import GroupsControlPanelComponent from './groups-control-panel.component';

// Module dependencies
import angularMarked from 'angular-marked';
import uibs from 'angular-ui-bootstrap';
import User from '../../services/User';
import Group from '../../services/Group';
import Act from '../../services/Act';

const controlPanel = angular
  .module('controlPanel', [
    angularMarked,
    uibs,
    User,
    Group,
    Act,
  ])
  .component('controlPanel', ControlPanelComponent)
  .component('userControlPanel', UserControlPanelComponent)
  .component('groupControlPanel', GroupControlPanelComponent)
  .component('deedsControlPanel', DeedsControlPanelComponent)
  .component('usersControlPanel', UsersControlPanelComponent)
  .component('groupsControlPanel', GroupsControlPanelComponent)
  .name;

export default controlPanel;
