import angular from 'angular';
import FeedService from './feed.service';
import FeedComponent from './feed.component';
import FeedItemComponent from './feed-item.component';

// Module dependencies
import angularMarked from 'angular-marked';
import angularInView from 'angular-inview';

const feed = angular
  .module('feed', [
    angularMarked,
    angularInView.name,
  ])
  .service('Feed', FeedService)
  .component('feed', FeedComponent)
  .component('feedItem', FeedItemComponent)
  .name;

export default feed;
