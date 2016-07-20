import angular from 'angular';
import SameAs from './same-as.directive';

const sameAs = angular
  .module('sameAs', [])
  .directive('sameAs', () => new SameAs)
  .name;

export default sameAs;
