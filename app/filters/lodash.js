import angular from 'angular';
import capitalize from 'lodash/capitalize';
import kebabCase from 'lodash/kebabCase';

export default angular.module('app.filters.lodash', [])
  .filter('capitalize', () => capitalize)
  .filter('kebabCase', () => kebabCase)
  .name;
