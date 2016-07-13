import angular from 'angular';
import GroupsControlPanelComponent from './groups-control-panel.component';

const groupsControlPanel = angular
  .module('groupsControlPanel', [])
  .component('groupsControlPanel', GroupsControlPanelComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('controlPanel.groups', {
      url: '/groups?query',
      views: {
        section: { component: 'groupsControlPanel' },
      },
      resolve: {
        query: /* @ngInject */ $stateParams => $stateParams.query,
        groups: /* @ngInject */ (Group, query) => Group.find({ limit: 20, query }),
      }
    });
  })
  .name;

export default groupsControlPanel;
