import HomeFeedController from './home-feed.controller';

const HomeFeedComponent = {
  controller: HomeFeedController,
  template: `
    <div class="container container-pad">
      <div class="row">
        <div class="col-sm-4 col-sm-push-8 m-b-lg">
          <h3 class="m-t-none m-b-md">
            <i class="fa fa-users"></i>
            Groups
          </h3>
          <div class="list-group group-list">
            <a class="list-group-item clearfix"
               ng-repeat="group in $ctrl.User.current.groups track by group._id"
               ng-href="/g/{{ ::group.urlName }}">
              <div class="group-list-img">
                <img ng-src="{{ ::group.logo || '/images/group.png' }}"
                     class="img-circle">
              </div>
              <div class="group-list-content">
                <h4 class="m-none">{{ ::group.name }}</h4>
                <p class="m-b-none">
                  <span class='f-lg'>
                    {{ $ctrl.Act.counters[group._id] | number }}
                  </span> acts of love
                </p>
              </div>
            </a>
          </div>
        </div>

        <div class="col-sm-8 col-sm-pull-4">
          <h3 class="m-t-none m-b-md">
            <i class="fa fa-fw fa-list"></i>
            Activity Feed
          </h3>

          <feed criteria="{
            user: $ctrl.User.current._id,
            group: $ctrl.listGroupIds($ctrl.User.current.groups)
          }"></feed>
        </div>
      </div>
    </div>
  `
};

export default HomeFeedComponent;
