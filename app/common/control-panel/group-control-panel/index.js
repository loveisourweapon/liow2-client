import angular from 'angular';
import GroupControlPanelComponent from './group-control-panel.component';

const groupControlPanel = angular
  .module('groupControlPanel', [])
  .component('groupControlPanel', GroupControlPanelComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('controlPanel.group', {
      url: '/group/:groupId',
      views: {
        section: { component: 'groupControlPanel' },
      },
      resolve: {
        group: /* @ngInject */ ($stateParams, Group) => Group.findOne({
          _id: $stateParams.groupId,
        }),
      }
    });
  })
  .name;

export default groupControlPanel;
