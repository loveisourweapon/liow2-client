import angular from 'angular';
import GlobalFeedComponent from './global-feed.component';

// Module dependencies
import Feed from '../../services/Feed';

const globalFeed = angular
  .module('globalFeed', [
    Feed,
  ])
  .component('globalFeed', GlobalFeedComponent)
  .name;

export default globalFeed;
