import angular from 'angular';

export default angular.module('app.directives', [])
  .directive('sameAs', () => {
    return {
      require: 'ngModel',
      scope: {
        'otherValue': '=sameAs'
      },
      link: (scope, elm, attrs, ctrl) => {
        ctrl.$validators.sameAs = modelValue => modelValue === scope.otherValue;
      }
    };
  })
  .name;
