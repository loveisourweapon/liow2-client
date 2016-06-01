import angular from 'angular';
import head from 'lodash/head';
import isFunction from 'lodash/isFunction';

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
  .component('iconChecked', {
    bindings: {
      value: '='
    },
    template: `
      <i class="fa fa-lg" ng-class="{
        'fa-check-circle text-success': $ctrl.value,
        'fa-times-circle text-muted': !$ctrl.value
      }"></i>
    `
  })
  .name;
