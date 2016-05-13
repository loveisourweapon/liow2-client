import _ from 'lodash';
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
  .directive('autofocus', /* @ngInject */ $timeout => {
    return {
      restrict: 'A',
      link: (scope, elm) => {
        $timeout(() => {
          let element = _.head(elm);

          element.focus();
          _.isFunction(element.select) && element.select();
        })
      }
    }
  })
  .name;
