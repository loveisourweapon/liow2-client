import angular from 'angular';
import GroupsControlPanelComponent from './groups-control-panel.component';

const groupsControlPanel = angular
  .module('groupsControlPanel', [])
  .component('groupsControlPanel', GroupsControlPanelComponent)
  .config($stateProvider => {
    'ngInject';

    const limit = 20;

    $stateProvider.state('controlPanel.groups', {
      url: '/groups?query&page',
      views: {
        section: { component: 'groupsControlPanel' },
      },
      resolve: {
        query: /* @ngInject */ $stateParams => $stateParams.query,
        page: /* @ngInject */ $stateParams => $stateParams.page || 1,
        pageSize: () => limit,
        groups: /* @ngInject */ (Group, query, page) => Group.find({
          limit,
          query,
          skip: (page - 1) * limit,
        }),
        numberOfGroups: /* @ngInject */ (Group, query, page) => Group.find({
          count: true,
          limit,
          query,
          skip: (page - 1) * limit,
        }),
      }
    });
  })
  .name;

export default groupsControlPanel;
