import angular from 'angular';
import GroupService from './group.service';
import CampaignService from './campaign.service';
import GroupComponent from './group.component';

const group = angular
  .module('group', [])
  .service('Group', GroupService)
  .service('Campaign', CampaignService)
  .component('group', GroupComponent)
  .name;

export default group;
