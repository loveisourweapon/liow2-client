import angular from 'angular';

// Module dependencies
import Feed from '../../services/Feed';
import jumbotron from '../jumbotron';
import feed from '../feed';

// Component dependencies
import GlobalFeedCtrl from './GlobalFeedCtrl';
import globalFeedTpl from './globalFeed.html';

export default angular.module('app.components.globalFeed', [
  Feed,
  jumbotron,
  feed
])
  .component('globalFeed', {
    controller: GlobalFeedCtrl,
    template: globalFeedTpl
  })
  .name;
