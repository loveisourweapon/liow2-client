import _ from 'lodash';

export default class GlobalFeedCtrl {
  constructor($rootScope, Feed) {
    Object.assign(this, { Feed });

    this.feedItems = null;
    this.loadFeed();

    $rootScope.title = 'Global Activity Feed';
  }

  /**
   * Load feed items
   *
   * @param {object} [params={}]
   */
  loadFeed(params = {}) {
    this.loading = true;
    this.Feed.find(params)
      .then(response => {
        if (_.has(params, 'before')) {
          this.feedItems = this.feedItems.concat(response.data);
        } else if (_.has(params, 'after')) {
          this.feedItems = response.data.concat(this.feedItems);
        } else {
          this.feedItems = response.data;
        }
      })
      .catch(() => null)
      .then(() => this.loading = false);
  }
}

GlobalFeedCtrl.$inject = ['$rootScope', 'Feed'];
