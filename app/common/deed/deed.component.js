import DeedController from './deed.controller';

const DeedComponent = {
  bindings: {
    deedSlug: '<',
  },
  controller: DeedController,
  template: `
    <jumbotron jumbo-classes="videotron">
      <jumbo-content>
        <div class="embed-responsive embed-responsive-16by9"
             ng-if="$ctrl.Deed.current.videoUrl">
          <youtube-video ng-if="$ctrl.Deed.current.videoUrl"
                         video-url="$ctrl.Deed.current.videoUrl"
                         class="embed-responsive-item"></youtube-video>
        </div>
    
        <div class="deed-header">
          <img ng-src="{{ $ctrl.Deed.current.logo || '/images/deed.png' }}"
               class="img-responsive img-circle pull-left m-t-md m-r-sm">
    
          <h2 class="text-uppercase pull-left m-b-none">
            {{ $ctrl.Deed.current.title }}
          </h2>
    
          <h1 class="pull-right text-right m-b-none">
            {{ $ctrl.Act.counters[$ctrl.Deed.current._id] | number }}
          </h1>
        </div>
      </jumbo-content>
    </jumbotron>
    
    <div class="container container-pad">
      <div class="row">
        <div ng-if="!($ctrl.loading || $ctrl.error)">
          <div class="col-sm-3 col-sm-push-9 m-b-sm">
            <button type="button"
                    class="btn btn-primary btn-block btn-lg"
                    ng-click="$ctrl.done($ctrl.Deed.current, $ctrl.User.group)"
                    ng-if="$ctrl.User.isAuthenticated()"
                    ng-disabled="$ctrl.doing">
              <img src="/images/logo-invert.png" class="img-responsive img-btn" ng-hide="$ctrl.doing">
              <i class="fa fa-cog fa-lg fa-spin" ng-show="$ctrl.doing"></i>
              Done
            </button>
    
            <button type="button"
                    class="btn btn-primary btn-block btn-lg"
                    ng-click="$ctrl.Modal.openLogin()"
                    ng-if="!$ctrl.User.isAuthenticated()">
              <i class="fa fa-fw fa-user"></i>
              Login
            </button>
    
            <deed-list layout="vertical"></deed-list>
          </div>
    
          <div class="col-sm-9 col-sm-pull-3">
            <h2 class="m-t-none">Devotional</h2>
            <div marked="$ctrl.Deed.current.content" class="m-b-md"></div>
    
            <comment-form deed="$ctrl.Deed.current"
                          placeholder="Leave a testimony..."
                          ng-if="$ctrl.User.isAuthenticated()"></comment-form>
    
            <feed criteria="{ 'target.deed': $ctrl.Deed.current._id }"></feed>
          </div>
        </div>
    
        <div class="col-xs-12" ng-if="$ctrl.loading">
          <p class="text-center">
            <i class="fa fa-cog fa-5x fa-spin"></i>
          </p>
        </div>
    
        <div class="col-xs-12" ng-if="$ctrl.error">
          <uib-alert type="danger">
            <i class="fa fa-exclamation-triangle"></i>
            {{ $ctrl.error }}
          </uib-alert>
        </div>
      </div>
    </div>
  `
};

export default DeedComponent;
