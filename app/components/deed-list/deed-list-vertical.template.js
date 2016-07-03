const deedListVerticalTemplate = `
  <div class="container-pad-sm">
    <div class="deed-wrapper"
         ng-class="{ 'deed-current': deed._id === $ctrl.Deed.current._id }"
         ng-repeat="deed in $ctrl.deeds track by deed._id"
         ng-click="$ctrl.$location.url('/d/' + deed.urlTitle)">
      <div class="deed-image">
        <img ng-src="{{ ::deed.logo || '/images/deed.png' }}"
             class="img-responsive img-circle">
      </div>
      <div class="deed-text">
        <span class="deed-title">{{ ::deed.title }}</span>
        <br>
        <span class="deed-count">{{ $ctrl.Act.counters[deed._id] | number }}</span>
        <span class="deed-subtext">DEEDS DONE</span>
      </div>
    </div>
  </div>
`;

export default deedListVerticalTemplate;
