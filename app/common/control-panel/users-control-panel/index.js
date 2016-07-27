import angular from 'angular';
import UsersControlPanelComponent from './users-control-panel.component';

const usersControlPanel = angular
  .module('usersControlPanel', [])
  .component('usersControlPanel', UsersControlPanelComponent)
  .config($stateProvider => {
    'ngInject';

    const limit = 20;

    $stateProvider.state('controlPanel.users', {
      url: '/users?query&page',
      views: {
        section: { component: 'usersControlPanel' },
      },
      resolve: {
        query: /* @ngInject */ $stateParams => $stateParams.query,
        page: /* @ngInject */ $stateParams => $stateParams.page || 1,
        pageSize: () => limit,
        users: /* @ngInject */ (User, query, page) => User.find({
          limit,
          query,
          skip: (page - 1) * limit,
          sort: '-_id',
        }),
        numberOfUsers: /* @ngInject */ (User, query, page) => User.find({
          count: true,
          limit,
          query,
          skip: (page - 1) * limit,
          sort: '-_id',
        }),
      }
    });
  })
  .name;

export default usersControlPanel;
