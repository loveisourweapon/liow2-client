export default class GlobalFeedCtrl {
  constructor($rootScope, Feed) {
    $rootScope.title = 'Global Activity Feed';

    Feed.update({ refresh: true });
  }
}

GlobalFeedCtrl.$inject = ['$rootScope', 'Feed'];
