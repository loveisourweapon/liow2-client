import angular from 'angular';
import last from 'lodash/last';
import capitalize from 'lodash/capitalize';
import kebabCase from 'lodash/kebabCase';

export default angular.module('app.filters.lodash', [])
  .filter('last', () => last)
  .filter('capitalize', () => capitalize)
  .filter('kebabCase', () => kebabCase)
  .name;
