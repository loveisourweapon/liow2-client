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
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider
      .state('controlPanel', {
        url: '/control-panel',
        component: 'controlPanel',
        abstract: true,
      })
      .state('controlPanel.user', {
        url: '/user',
        views: {
          section: { component: 'userControlPanel' },
        }
      })
      .state('controlPanel.group', {
        url: '/group/:groupId',
        views: {
          section: { component: 'groupControlPanel' },
        },
        resolve: {
          groupId: /* @ngInject */ $stateParams => $stateParams.groupId,
        }
      })
      .state('controlPanel.deeds', {
        url: '/deeds',
        views: {
          section: { component: 'deedsControlPanel' },
        }
      })
      .state('controlPanel.users', {
        url: '/users',
        views: {
          section: { component: 'usersControlPanel' },
        }
      })
      .state('controlPanel.groups', {
        url: '/groups',
        views: {
          section: { component: 'groupsControlPanel' },
        }
      });

    $urlRouterProvider.when('/control-panel', '/control-panel/user');
  })
  .name;

export default controlPanel;
