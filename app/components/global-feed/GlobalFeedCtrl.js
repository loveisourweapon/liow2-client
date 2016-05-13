export default class GlobalFeedCtrl {
  /* @ngInject */
  constructor($rootScope, Feed) {
    $rootScope.title = 'Global Activity Feed';

    Feed.update({ refresh: true });
  }
}
