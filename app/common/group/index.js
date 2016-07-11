import angular from 'angular';
import GroupService from './group.service';
import CampaignService from './campaign.service';
import GroupComponent from './group.component';

const group = angular
  .module('group', [])
  .service('Group', GroupService)
  .service('Campaign', CampaignService)
  .component('group', GroupComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('group', {
      url: '/g/:groupSlug',
      component: 'group',
      resolve: {
        groupSlug: /* @ngInject */ $stateParams => $stateParams.groupSlug,
      }
    });
  })
  .name;

export default group;
