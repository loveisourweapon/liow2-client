import _ from 'lodash';

export default class FeedCtrl {
  constructor($scope, User, Feed) {
    Object.assign(this, { User, Feed });

    this.feedItems = null;

    let feedUpdateOff = this.Feed.onUpdate((options) => {
      if (options.clear || options.refresh) {
        this.feedItems = null;

        if (options.clear) return;
      }

      this.loadFeed(this.feedItems ? { after: this.feedItems[0].created } : {});
    });

    $scope.$on('$destroy', feedUpdateOff);
  }

  /**
   * Load feed items
   *
   * @param {object} [params={}]
   */
  loadFeed(params = {}) {
    this.loading = true;
    this.Feed.find(_.merge(params, this.criteria))
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

  /**
   * Load more feed items if last feed item is in view
   *
   * @param {boolean} $inView
   * @param {number}  $index
   */
  onInView($inView, $index) {
    if ($index === this.feedItems.length - 1 && $inView) {
      this.loadFeed({
        before: this.feedItems[this.feedItems.length - 1].created
      });
    }
  }
}

FeedCtrl.$inject = ['$scope', 'User', 'Feed'];
