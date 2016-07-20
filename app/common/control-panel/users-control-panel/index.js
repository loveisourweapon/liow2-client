import angular from 'angular';
import UsersControlPanelComponent from './users-control-panel.component';

const usersControlPanel = angular
  .module('usersControlPanel', [])
  .component('usersControlPanel', UsersControlPanelComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('controlPanel.users', {
      url: '/users?query',
      views: {
        section: { component: 'usersControlPanel' },
      },
      resolve: {
        query: /* @ngInject */ $stateParams => $stateParams.query,
        users: /* @ngInject */ (User, query) => User.find({ limit: 20, query }),
      }
    });
  })
  .name;

export default usersControlPanel;
