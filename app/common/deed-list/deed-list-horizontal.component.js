const DeedListHorizontalComponent = {
  require: {
    deedList: '^^',
  },
  template: `
    <div class="container container-pad-sm">
      <div class="row">
        <div class="col-xs-12" ng-if="!$ctrl.deedList.loading">
          <div class="deed-wrapper"
               ng-repeat="deed in $ctrl.deedList.deeds track by deed._id"
               ng-click="$ctrl.deedList.$location.url('/d/' + deed.urlTitle)">
            <div class="deed-image">
              <img ng-src="{{ ::deed.logo || '/images/deed.png' }}"
                   class="img-responsive img-circle">
              <div class="deed-title-wrapper">
                <div class="deed-title">{{ ::deed.title }}</div>
              </div>
            </div>
            <div class="deed-text text-center">
              <div class="deed-count">{{ $ctrl.deedList.Act.counters[deed._id] | number }}</div>
              <div class="deed-subtext">Deeds Done</div>
            </div>
          </div>
        </div>

        <loading-spinner size="4x" ng-if="$ctrl.deedList.loading"></loading-spinner>
      </div>
    </div>
  `
};

export default DeedListHorizontalComponent;
