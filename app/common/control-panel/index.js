import angular from 'angular';
import ControlPanelComponent from './control-panel.component';

// Module dependencies
import ControlPanelSearch from './control-panel-search';
import UserControlPanel from './user-control-panel';
import GroupControlPanel from './group-control-panel';
import DeedsControlPanel from './deeds-control-panel';
import UsersControlPanel from './users-control-panel';
import GroupsControlPanel from './groups-control-panel';
import CommentsControlPanel from './comments-control-panel';

const controlPanel = angular
  .module('controlPanel', [
    ControlPanelSearch,
    UserControlPanel,
    GroupControlPanel,
    DeedsControlPanel,
    UsersControlPanel,
    GroupsControlPanel,
    CommentsControlPanel,
  ])
  .component('controlPanel', ControlPanelComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider.state('controlPanel', {
      url: '/control-panel',
      component: 'controlPanel',
      abstract: true,
    });

    $urlRouterProvider.when('/control-panel', '/control-panel/user');
  })
  .name;

export default controlPanel;
