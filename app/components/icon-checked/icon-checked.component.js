const IconCheckedComponent = {
  bindings: {
    value: '<',
  },
  template: `
    <i class="fa fa-lg" ng-class="{
      'fa-check-circle text-success': $ctrl.value,
      'fa-times-circle text-muted': !$ctrl.value
    }"></i>
  `
};

export default IconCheckedComponent;
