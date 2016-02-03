import angular from 'angular';
import angularMarked from 'angular-marked';

// Module dependencies
import jumbotron from '../jumbotron';
import Group from '../../services/Group';

import GroupCtrl from './GroupCtrl';
import template from './group.html';
export let groupTpl = template;

export let group = angular.module('app.components.group', [angularMarked, jumbotron, Group])
  .controller('GroupCtrl', GroupCtrl)
  .name;
