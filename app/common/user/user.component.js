import UserController from './user.controller';

const UserComponent = {
  bindings: {
    userId: '<',
  },
  controller: UserController,
  template: `
    <jumbotron jumbo-image="$ctrl.user.picture || $ctrl.User.getDefaultUserImage(item.user._id)"
               jumbo-background="::$ctrl.jumbotronBackground"
               jumbo-classes="jumbotron-small">
      <jumbo-title>{{ ::$ctrl.user.name }}</jumbo-title>
      <jumbo-text>
        <span class="f-lg">
          {{ $ctrl.Act.counters[$ctrl.user._id] | number }}
        </span>
        acts of love
      </jumbo-text>
    </jumbotron>

    <div class="container container-pad">
      <div class="row">
        <div ng-if="!($ctrl.loading || $ctrl.error)">
          <div class="col-xs-12">
            <h3 class="m-t-none m-b-md">
              <i class="fa fa-fw fa-list"></i>
              Activity Feed
            </h3>

            <feed criteria="{ user: $ctrl.user._id }"
                  ng-if="$ctrl.User.isAuthenticated()"></feed>

            <p ng-if="!$ctrl.User.isAuthenticated()">
              You must <a ng-click="$ctrl.Modal.openLogin()" href>login</a>
              to see {{ $ctrl.user.firstName }}'s Activity Feed.
            </p>
          </div>
        </div>

        <loading-spinner size="5x" ng-if="$ctrl.loading"></loading-spinner>

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

export default UserComponent;
