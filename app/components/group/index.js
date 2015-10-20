import angular from 'angular';

// Module dependencies
import jumbotron from '../jumbotron';

import GroupCtrl from './GroupCtrl';
import template from './group.html';
export let groupTpl = template;

export let group = angular.module('app.components.group', [jumbotron])
  .controller('GroupCtrl', GroupCtrl)
  .name;
