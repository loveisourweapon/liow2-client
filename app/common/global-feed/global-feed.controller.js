class GlobalFeedController {
  /* @ngInject */
  constructor($rootScope, Feed) {
    Object.assign(this, { $rootScope, Feed });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = 'Global Activity Feed';

    this.Feed.update({ refresh: true });
  }
}

export default GlobalFeedController;
