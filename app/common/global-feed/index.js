import angular from 'angular';
import GlobalFeedComponent from './global-feed.component';

const globalFeed = angular
  .module('globalFeed', [])
  .component('globalFeed', GlobalFeedComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('globalFeed', {
      url: '/global',
      component: 'globalFeed',
    });
  })
  .name;

export default globalFeed;
