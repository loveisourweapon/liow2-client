import angular from 'angular';
import GlobalFeedComponent from './global-feed.component';

const globalFeed = angular
  .module('globalFeed', [])
  .component('globalFeed', GlobalFeedComponent)
  .name;

export default globalFeed;
