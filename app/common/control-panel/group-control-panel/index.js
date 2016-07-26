import angular from 'angular';
import GroupControlPanelComponent from './group-control-panel.component';

const groupControlPanel = angular
  .module('groupControlPanel', [])
  .component('groupControlPanel', GroupControlPanelComponent)
  .config($stateProvider => {
    'ngInject';

    const limit = 20;

    $stateProvider
      .state('controlPanel.group', {
        url: '/group/:groupId',
        views: {
          section: { component: 'groupControlPanel' },
        },
        resolve: {
          group: /* @ngInject */ ($stateParams, Group) => Group.findOne({
            _id: $stateParams.groupId,
          }),
          numberOfMembers: /* @ngInject */ (User, group) => User.find({
            count: true,
            groups: group._id,
          }),
        }
      })
      .state('controlPanel.group.users', {
        url: '/users?query&page',
        views: {
          tab: { component: 'usersControlPanel' },
        },
        resolve: {
          query: /* @ngInject */ $stateParams => $stateParams.query,
          page: /* @ngInject */ $stateParams => $stateParams.page || 1,
          pageSize: () => limit,
          users: /* @ngInject */ (User, group, query, page) => User.find({
            groups: group._id,
            limit,
            query,
            skip: (page - 1) * limit,
          }),
          numberOfUsers: /* @ngInject */ (User, group, query, page) => User.find({
            count: true,
            groups: group._id,
            limit,
            query,
            skip: (page - 1) * limit,
          }),
        }
      });
  })
  .name;

export default groupControlPanel;
