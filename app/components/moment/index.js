import angular from 'angular';
import MomentFilter from './moment.filter';
import FromNowFilter from './from-now.filter';

const moment = angular
  .module('app.filters.moment', [])
  .filter('moment', MomentFilter)
  .filter('fromNow', FromNowFilter)
  .name;

export default moment;
