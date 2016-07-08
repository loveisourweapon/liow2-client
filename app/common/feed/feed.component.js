import FeedController from './feed.controller';

const FeedComponent = {
  bindings: {
    criteria: '<',
  },
  controller: FeedController,
  template: `
    <div class="feed-refresh-button">
      <button type="button"
              ng-click="$ctrl.loadFeed({ after: $ctrl.feedItems[0]._id })"
              ng-disabled="$ctrl.loading || $ctrl.feedItems === null"
              class="btn btn-link">
        <i class="fa fa-refresh fa-lg"
           ng-class="{ 'fa-spin': $ctrl.loadingFeed }"></i>
      </button>
    </div><!-- .feed-refresh-button -->

    <div class="feed-wrapper">
      <feed-item ng-repeat="item in $ctrl.feedItems track by item._id"
                 item="item"
                 in-view="$ctrl.onInView($inview, $index)"
                 in-view-options="{ debounce: 100 }"></feed-item>

      <div class="feed-item feed-item-narrow text-center"
           ng-show="$ctrl.loading || $ctrl.feedItems === null">
        <i class="fa fa-ellipsis-h fa-2x"></i>
      </div>

      <div class="feed-item"
           ng-if="$ctrl.feedItems.length === 0">
        No feed items to show.
      </div>
    </div><!-- .feed-wrapper -->
  `
};

export default FeedComponent;
