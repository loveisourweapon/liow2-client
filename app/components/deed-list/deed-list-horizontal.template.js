const deedListHorizontalTemplate = `
  <div class="container container-pad-sm">
    <div class="row">
      <div class="col-xs-12" ng-if="!$ctrl.loading">
        <div class="deed-wrapper"
             ng-repeat="deed in $ctrl.deeds track by deed._id"
             ng-click="$ctrl.$location.url('/d/' + deed.urlTitle)">
          <div class="deed-image">
            <img ng-src="{{ ::deed.logo || '/images/deed.png' }}"
                 class="img-responsive img-circle">
            <div class="deed-title-wrapper">
              <div class="deed-title">{{ ::deed.title }}</div>
            </div>
          </div>
          <div class="deed-text text-center">
            <div class="deed-count">{{ $ctrl.Act.counters[deed._id] | number }}</div>
            <div class="deed-subtext">DEEDS DONE</div>
          </div>
        </div>
      </div>
  
      <div class="col-xs-12" ng-if="$ctrl.loading">
        <p class="text-center">
          <i class="fa fa-cog fa-4x fa-spin"></i>
        </p>
      </div>
    </div>
  </div>
`;

export default deedListHorizontalTemplate;
