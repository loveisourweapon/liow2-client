import _ from 'lodash';
import angular from 'angular';

export default angular.module('app.filters.lodash', [])
  .filter('capitalize', () => _.capitalize)
  .filter('kebabCase', () => _.kebabCase)
  .name;
