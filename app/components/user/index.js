import angular from 'angular';

// Module dependencies
import jumbotron from '../jumbotron';

import UserCtrl from './UserCtrl';
import template from './user.html';
export let userTpl = template;

export let user = angular.module('app.components.user', [jumbotron])
  .controller('UserCtrl', UserCtrl)
  .name;
