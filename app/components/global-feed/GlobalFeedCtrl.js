export default class GlobalFeedCtrl {
  constructor($rootScope, Feed) {
    Object.assign(this, { Feed });

    this.feedItems = null;
    this.loadFeed();

    $rootScope.title = 'Global Activity Feed';
  }

  /**
   * Load feed items
   */
  loadFeed() {
    this.Feed.find()
      .then(response => this.feedItems = response.data);
  }
}

GlobalFeedCtrl.$inject = ['$rootScope', 'Feed'];
