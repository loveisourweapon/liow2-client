import angular from 'angular';

// Module dependencies
import jumbotron from '../jumbotron';

import DeedCtrl from './DeedCtrl';
import template from './deed.html';
export let deedTpl = template;

export let deed = angular.module('app.components.deed', [jumbotron])
  .controller('DeedCtrl', DeedCtrl)
  .name;
