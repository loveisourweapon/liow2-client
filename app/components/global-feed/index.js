import angular from 'angular';

// Module dependencies
import Feed from '../../services/Feed';
import jumbotron from '../jumbotron';
import feed from '../feed';

// Component dependencies
import GlobalFeedCtrl from './GlobalFeedCtrl';
import template from './globalFeed.html';
export let globalFeedTpl = template;

export let globalFeed = angular.module('app.components.globalFeed', [
  Feed,
  jumbotron,
  feed
])
  .controller('GlobalFeedCtrl', GlobalFeedCtrl)
  .name;
