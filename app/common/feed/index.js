import angular from 'angular';
import FeedComponent from './feed.component.js';

// Module dependencies
import angularMarked from 'angular-marked';
import angularInView from 'angular-inview';
import User from '../../services/User';
import Feed from '../../services/Feed';

const feed = angular
  .module('feed', [
    angularMarked,
    angularInView.name,
    User,
    Feed,
  ])
  .component('feed', FeedComponent)
  .name;

export default feed;
