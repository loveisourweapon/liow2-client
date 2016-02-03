import angular from 'angular';
import angularMarked from 'angular-marked';

// Module dependencies
import jumbotron from '../jumbotron';
import GroupService from '../../services/group';

import GroupCtrl from './GroupCtrl';
import template from './group.html';
export let groupTpl = template;

export let group = angular.module('app.components.group', [angularMarked, jumbotron, GroupService])
  .controller('GroupCtrl', GroupCtrl)
  .name;
