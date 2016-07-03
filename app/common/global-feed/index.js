import angular from 'angular';
import GlobalFeedComponent from './global-feed.component';

// Module dependencies
import Feed from '../../services/Feed';
import Jumbotron from '../../components/jumbotron';
import feed from '../../components/feed';

const globalFeed = angular
  .module('globalFeed', [
    Feed,
    Jumbotron,
    feed,
  ])
  .component('globalFeed', GlobalFeedComponent)
  .name;

export default globalFeed;
