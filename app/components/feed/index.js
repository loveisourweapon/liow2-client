import angular from 'angular';

// Module dependencies
import angularMarked from 'angular-marked';
import angularInView from 'angular-inview';
import momentFilters from '../../filters/moment';
import User from '../../services/User';

// Component dependencies
import FeedCtrl from './FeedCtrl';
import feedTpl from './feed.html';

export default angular.module('app.components.feed', [
  angularMarked,
  angularInView.name,
  momentFilters,
  User
])
  .component('feed', {
    controller: FeedCtrl,
    template: feedTpl,
    bindings: {
      feedItems: '<',
      loading: '<',
      loadMore: '&'
    }
  })
  .name;
