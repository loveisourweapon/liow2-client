import has from 'lodash/has';
import merge from 'lodash/merge';

class FeedController {
  /* @ngInject */
  constructor(User, Feed) {
    Object.assign(this, { User, Feed });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.feedItems = null;

    this.feedUpdateOff = this.Feed.onUpdate(options => {
      if (options.clear || options.refresh) {
        this.feedItems = null;

        if (options.clear) return;
      }

      this.loadFeed(this.feedItems ? { after: this.feedItems[0]._id } : {});
    });
  }

  /**
   * Component is being destroyed
   */
  $onDestroy() {
    this.feedUpdateOff();
  }

  /**
   * Load feed items
   *
   * @param {object} [params={}]
   */
  loadFeed(params = {}) {
    this.loading = true;
    this.Feed.find(merge(params, this.criteria))
      .then(feedItems => {
        if (has(params, 'before')) {
          this.feedItems = this.feedItems.concat(feedItems);
        } else if (has(params, 'after')) {
          this.feedItems = feedItems.concat(this.feedItems);
        } else {
          this.feedItems = feedItems;
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
        before: this.feedItems[this.feedItems.length - 1]._id
      });
    }
  }
}

export default FeedController;
