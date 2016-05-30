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
  })
  .name;
