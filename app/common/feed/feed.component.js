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
    </div>
    
    <div class="feed-wrapper">
      <div class="feed-item clearfix"
           ng-repeat="item in $ctrl.feedItems track by item._id"
           in-view="$ctrl.onInView($inview, $index)"
           in-view-options="{ debounce: 100 }">
        <div class="feed-item-type">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x text-muted"></i>
            <i class="fa fa-stack-1x fa-inverse"
               ng-class="{
                 'fa-heart': item.act,
                 'fa-quote-right': item.comment && item.target.deed,
                 'fa-bullhorn': item.comment && item.target.group
               }"></i>
          </span>
        </div>
    
        <div class="feed-item-image">
          <img ng-src="{{ ::item.user.picture || $ctrl.User.getDefaultUserImage(item.user._id) }}"
               class="img-circle">
        </div>
    
        <div class="feed-item-content">
          <h6 class="m-t-none">
            <a ng-href="/u/{{ ::item.user._id }}"
               ng-if="$ctrl.User.isLoggedInUser(item.user) || $ctrl.User.isMemberOfGroup(item.group)">
              {{ ::item.user.firstName }}
            </a>
            <span ng-if="!($ctrl.User.isLoggedInUser(item.user) || $ctrl.User.isMemberOfGroup(item.group))">
              Someone
            </span>
    
            <span ng-if="::item.group && !item.target.group">
              from
              <a ng-href="/g/{{ ::item.group.urlName }}">{{ ::item.group.name }}</a>
            </span>
    
            <span ng-if="::item.act">did the act of love</span>
            <span ng-if="::item.comment && item.target.deed">left a testimony on</span>
            <span ng-if="::item.comment && item.target.group">wrote a message to</span>
    
            <a ng-href="/d/{{ ::item.target.deed.urlTitle }}"
               ng-if="::item.target.deed">{{ ::item.target.deed.title }}</a>
    
            <a ng-href="/g/{{ ::item.target.group.urlName }}"
               ng-if="::item.target.group">{{ ::item.target.group.name }}</a>
          </h6>
    
          <div marked="::item.comment.content.text"
               class="feed-item-comment"
               ng-if="::item.comment.content.text"></div>
    
          <p class="small m-b-none">
            <a href>
              {{ ::item.created | fromNow }}
            </a>
            &middot;
            {{ ::item.created | moment:'ddd, D MMM YYYY [at] HH:mm' }}
          </p>
        </div>
      </div><!-- .feed-item -->
    
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
