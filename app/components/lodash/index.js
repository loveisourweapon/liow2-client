import angular from 'angular';
import last from 'lodash/last';
import capitalize from 'lodash/capitalize';
import kebabCase from 'lodash/kebabCase';

const lodash = angular
  .module('lodash', [])
  .filter('last', () => last)
  .filter('capitalize', () => capitalize)
  .filter('kebabCase', () => kebabCase)
  .name;

export default lodash;
