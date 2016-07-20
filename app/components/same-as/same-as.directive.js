class SameAs {
  constructor() {
    this.restrict = 'A';
    this.require = 'ngModel';
    this.scope = {
      otherValue: '<sameAs',
    };
  }

  link($scope, $element, $attrs, $controller) {
    $controller.$validators.sameAs = modelValue => modelValue === $scope.otherValue;
  }
}

export default SameAs;
