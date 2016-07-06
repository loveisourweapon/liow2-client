import angular from 'angular';
import GroupService from './group.service';
import CampaignService from './campaign.service';
import GroupComponent from './group.component';

// Module dependencies
import angularMarked from 'angular-marked';
import uibs from 'angular-ui-bootstrap';

const group = angular
  .module('group', [
    angularMarked,
    uibs,
  ])
  .service('Group', GroupService)
  .service('Campaign', CampaignService)
  .component('group', GroupComponent)
  .name;

export default group;
