import angular from 'angular';
import UserControlPanelComponent from './user-control-panel.component';

const userControlPanel = angular
  .module('userControlPanel', [])
  .component('userControlPanel', UserControlPanelComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('controlPanel.user', {
      url: '/user',
      views: {
        section: { component: 'userControlPanel' },
      },
      resolve: {
        user: /* @ngInject */ User => User.loadCurrent(),
      }
    });
  })
  .name;

export default userControlPanel;
