import angular from 'angular';
import FeedService from './feed.service';
import FeedComponent from './feed.component';
import FeedItemComponent from './feed-item.component';

const feed = angular
  .module('feed', [])
  .service('Feed', FeedService)
  .component('feed', FeedComponent)
  .component('feedItem', FeedItemComponent)
  .name;

export default feed;
