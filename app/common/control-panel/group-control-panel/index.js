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
          browserTitle: /* @ngInject */ group => `Users | ${group.name}`,
          query: /* @ngInject */ $stateParams => $stateParams.query,
          page: /* @ngInject */ $stateParams => $stateParams.page || 1,
          pageSize: () => limit,
          users: /* @ngInject */ (User, group, query, page) => User.find({
            groups: group._id,
            limit,
            query,
            skip: (page - 1) * limit,
            sort: '-_id',
          }),
          numberOfUsers: /* @ngInject */ (User, group, query, page) => User.find({
            count: true,
            groups: group._id,
            limit,
            query,
            skip: (page - 1) * limit,
            sort: '-_id',
          }),
        }
      })
      .state('controlPanel.group.testimonies', {
        url: '/testimonies?page',
        views: {
          tab: { component: 'commentsControlPanel' },
        },
        resolve: {
          browserTitle: /* @ngInject */ group => `Testimonies | ${group.name}`,
          page: /* @ngInject */ $stateParams => $stateParams.page || 1,
          pageSize: () => limit,
          comments: /* @ngInject */ (Comment, group, page) => Comment.find({
            group: group._id,
            'target.group': 'null',
            limit,
            skip: (page - 1) * limit,
            sort: '-_id',
          }),
          numberOfComments: /* @ngInject */ (Comment, group, page) => Comment.find({
            count: true,
            group: group._id,
            'target.group': 'null',
            limit,
            skip: (page - 1) * limit,
            sort: '-_id',
          }),
        },
      });
  })
  .name;

export default groupControlPanel;
