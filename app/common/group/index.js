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
      url: '/g/:groupSlug?setupCampaign',
      reloadOnSearch: false,
      component: 'group',
      resolve: {
        groupSlug: /* @ngInject */ $stateParams => $stateParams.groupSlug,
        setupCampaign: /* @ngInject */ $stateParams => $stateParams.setupCampaign === 'true',
      }
    });
  })
  .name;

export default group;
