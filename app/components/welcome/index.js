import angular from 'angular';

import welcomeTpl from './welcome.html';

export default angular.module('app.components.welcome', [])
  .directive('welcome', () => {
    return {
      restrict: 'E',
      template: welcomeTpl
    };
  })
  .name;
