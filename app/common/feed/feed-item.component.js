const FeedItemComponent = {
  bindings: {
    item: '<',
  },
  require: {
    feed: '^^',
  },
  template: `
    <div class="feed-item clearfix">
      <div class="feed-item-type">
        <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x text-muted"></i>
          <i class="fa fa-stack-1x fa-inverse"
             ng-class="{
               'fa-heart': $ctrl.item.act,
               'fa-quote-right': $ctrl.item.comment && $ctrl.item.target.deed,
               'fa-bullhorn': $ctrl.item.comment && $ctrl.item.target.group
             }"></i>
        </span>
      </div>

      <div class="feed-item-image">
        <img ng-src="{{ ::$ctrl.item.user.picture || $ctrl.feed.User.getDefaultUserImage($ctrl.item.user._id) }}"
             class="img-circle">
      </div>

      <div class="feed-item-content">
        <h6 class="m-t-none">
          <a ng-href="/u/{{ ::$ctrl.item.user._id }}"
             ng-if="$ctrl.feed.User.isLoggedInUser($ctrl.item.user) || $ctrl.feed.User.isMemberOfGroup($ctrl.item.group)">
            {{ ::$ctrl.item.user.firstName }}
          </a>
          <span ng-if="!($ctrl.feed.User.isLoggedInUser($ctrl.item.user) || $ctrl.feed.User.isMemberOfGroup($ctrl.item.group))">
            Someone
          </span>

          <span ng-if="::$ctrl.item.group && !$ctrl.item.target.group">
            from
            <a ng-href="/g/{{ ::$ctrl.item.group.urlName }}">{{ ::$ctrl.item.group.name }}</a>
          </span>

          <span ng-if="::$ctrl.item.act">did the act of love</span>
          <span ng-if="::$ctrl.item.comment && $ctrl.item.target.deed">left a testimony on</span>
          <span ng-if="::$ctrl.item.comment && $ctrl.item.target.group">wrote a message to</span>

          <a ng-href="/d/{{ ::$ctrl.item.target.deed.urlTitle }}"
             ng-if="::$ctrl.item.target.deed">{{ ::$ctrl.item.target.deed.title }}</a>

          <a ng-href="/g/{{ ::$ctrl.item.target.group.urlName }}"
             ng-if="::$ctrl.item.target.group">{{ ::$ctrl.item.target.group.name }}</a>
        </h6>

        <div marked="::$ctrl.item.comment.content.text"
             class="feed-item-comment"
             ng-if="::$ctrl.item.comment.content.text"></div>

        <p class="small m-b-none">
          <a href>
            {{ ::$ctrl.item.created | fromNow }}
          </a>
          &middot;
          {{ ::$ctrl.item.created | moment:'ddd, D MMM YYYY [at] HH:mm' }}
        </p>
      </div>
    </div>
  `
};

export default FeedItemComponent;
